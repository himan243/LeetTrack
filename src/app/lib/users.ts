import 'server-only'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import seedUsers from '../../../data/users.json'
import { hasDatabase, supabase } from './database'

export type User = {
  id: string
  username: string
  passwordHash: string
  leetcodeUsername: string
  createdAt: string
  leetcodeStats?: LeetCodeStats
  lastSyncedAt?: string
  isAdmin?: boolean
}

export type LeetCodeStats = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  easyTotal: number
  mediumTotal: number
  hardTotal: number
  ranking?: number
  solvedProblemSlugs?: string[]
  activityDates?: string[]
}

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json')
type UserRow = {
  id: string
  username: string
  password_hash: string
  leetcode_username: string
  created_at: string
  leetcode_stats?: LeetCodeStats
  last_synced_at?: string
  is_admin?: boolean
}

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir) && process.env.NODE_ENV !== 'production') fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DATA_FILE) && process.env.NODE_ENV !== 'production') fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
}

function readUsers(): User[] {
  ensureDataDir()
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as User[]
  } catch {
    return seedUsers as User[]
  }
}

function writeUsers(users: User[]) {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

function fromRow(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    passwordHash: row.password_hash,
    leetcodeUsername: row.leetcode_username,
    createdAt: row.created_at,
    leetcodeStats: row.leetcode_stats,
    lastSyncedAt: row.last_synced_at,
    isAdmin: row.is_admin ?? false,
  }
}

export function isUserAdmin(user?: User | null): boolean {
  if (!user) return false
  if (user.isAdmin === true) return true
  if (user.username.toLowerCase() === 'admin') return true
  const adminList = (process.env.ADMIN_USERNAMES ?? '').split(',').map((u) => u.trim().toLowerCase()).filter(Boolean)
  return adminList.includes(user.username.toLowerCase())
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  if (hasDatabase) {
    const { data, error } = await supabase!.from('users').select('*').ilike('username', username).maybeSingle()
    if (error) throw error
    return data ? fromRow(data as UserRow) : undefined
  }
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase())
}

export async function findUserById(id: string): Promise<User | undefined> {
  if (hasDatabase) {
    const { data, error } = await supabase!.from('users').select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data ? fromRow(data as UserRow) : undefined
  }
  return readUsers().find((u) => u.id === id)
}

export async function getAllUsers(): Promise<User[]> {
  if (hasDatabase) {
    const { data, error } = await supabase!.from('users').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []).map((row) => fromRow(row as UserRow))
  }
  return readUsers()
}

export async function updateUser(id: string, updates: Partial<Pick<User, 'leetcodeUsername' | 'leetcodeStats' | 'lastSyncedAt'>>): Promise<User | undefined> {
  if (hasDatabase) {
    const databaseUpdates: Record<string, unknown> = {}
    if (updates.leetcodeUsername !== undefined) databaseUpdates.leetcode_username = updates.leetcodeUsername
    if (updates.leetcodeStats !== undefined) databaseUpdates.leetcode_stats = updates.leetcodeStats
    if (updates.lastSyncedAt !== undefined) databaseUpdates.last_synced_at = updates.lastSyncedAt
    const { data, error } = await supabase!.from('users').update(databaseUpdates).eq('id', id).select('*').maybeSingle()
    if (error) throw error
    return data ? fromRow(data as UserRow) : undefined
  }
  const users = readUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return undefined
  users[index] = { ...users[index], ...updates }
  writeUsers(users)
  return users[index]
}

export async function createUser(
  username: string,
  password: string,
  leetcodeUsername: string,
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 12)
  const id = crypto.randomUUID()
  const isAdmin = username.toLowerCase() === 'admin' || (process.env.ADMIN_USERNAMES ?? '').split(',').map((u) => u.trim().toLowerCase()).includes(username.toLowerCase())
  if (hasDatabase) {
    const { data, error } = await supabase!.from('users').insert({
      id,
      username,
      password_hash: passwordHash,
      leetcode_username: leetcodeUsername,
      is_admin: isAdmin,
    }).select('*').single()
    if (error) throw error
    return fromRow(data as UserRow)
  }
  const users = readUsers()
  const user: User = {
    id,
    username,
    passwordHash,
    leetcodeUsername,
    createdAt: new Date().toISOString(),
    isAdmin,
  }
  users.push(user)
  writeUsers(users)
  return user
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

