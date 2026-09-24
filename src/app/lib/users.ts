import 'server-only'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export type User = {
  id: string
  username: string
  passwordHash: string
  leetcodeUsername: string
  createdAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json')

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
}

function readUsers(): User[] {
  ensureDataDir()
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as User[]
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
