'use server'

import { redirect } from 'next/navigation'
import { createUser, findUserByUsername, verifyPassword } from '@/app/lib/users'
import { createSession, deleteSession } from '@/app/lib/session'

export type AuthState =
  | { errors?: { username?: string[]; password?: string[]; leetcodeUsername?: string[]; form?: string[] } }
  | undefined

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string

  const errors: NonNullable<AuthState>['errors'] = {}

  if (!username || username.length < 2) {
    errors.username = ['Username is required.']
  }
  if (!password || password.length < 6) {
    errors.password = ['Password must be at least 6 characters.']
  }
  if (Object.keys(errors).length > 0) return { errors }

  let user
  try {
    user = await findUserByUsername(username)
  } catch {
    return { errors: { form: ['Unable to reach the account database. Check the Supabase environment variables.'] } }
  }
  if (!user) {
    return { errors: { form: ['No account found with that username.'] } }
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { errors: { form: ['Incorrect password.'] } }
  }

  await createSession(user.id, user.username)
  redirect('/')
}

export async function signup(_state: AuthState, formData: FormData): Promise<AuthState> {
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string
  const leetcodeUsername = (formData.get('leetcodeUsername') as string)?.trim()

  const errors: NonNullable<AuthState>['errors'] = {}

  if (!username || username.length < 2) {
    errors.username = ['Username must be at least 2 characters.']
  } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
    errors.username = ['Username can only contain letters, numbers, _ . -']
  }

  if (!password || password.length < 6) {
    errors.password = ['Password must be at least 6 characters.']
  }

  if (Object.keys(errors).length > 0) return { errors }

  let existing
  try {
    existing = await findUserByUsername(username)
  } catch {
    return { errors: { form: ['Unable to reach the account database. Check the Supabase environment variables.'] } }
  }
  if (existing) {
    return { errors: { username: ['That username is already taken.'] } }
  }

  let user
  try {
    user = await createUser(username, password, leetcodeUsername ?? '')
  } catch {
    return { errors: { form: ['Account storage is not configured for this deployment. Add a hosted database before creating new accounts.'] } }
  }
  await createSession(user.id, user.username)
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
