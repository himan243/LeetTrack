import 'server-only'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import seedUsers from '../../../data/users.json'

export type User = {
  id: string
  username: string
  passwordHash: string
  leetcodeUsername: string
  createdAt: string
  leetcodeStats?: LeetCodeStats
  lastSyncedAt?: string
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

export function findUserByUsername(username: string): User | undefined {
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase())
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id)
}

export function updateUser(id: string, updates: Partial<Pick<User, 'leetcodeUsername' | 'leetcodeStats' | 'lastSyncedAt'>>): User | undefined {
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
  const users = readUsers()
  const id = crypto.randomUUID()
  const passwordHash = await bcrypt.hash(password, 12)
  const user: User = {
    id,
    username,
    passwordHash,
    leetcodeUsername,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  writeUsers(users)
  return user
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}
