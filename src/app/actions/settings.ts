'use server'

import { redirect } from 'next/navigation'
import { requireAuth } from '@/app/lib/session'
import { updateUser } from '@/app/lib/users'

export type SettingsState = { error?: string; success?: string } | undefined

export async function updateSettings(_state: SettingsState, formData: FormData): Promise<SettingsState> {
  const session = await requireAuth()
  const leetcodeUsername = String(formData.get('leetcodeUsername') ?? '').trim()

  if (leetcodeUsername && !/^[a-zA-Z0-9_-]+$/.test(leetcodeUsername)) {
    return { error: 'Use the username exactly as it appears in your LeetCode profile URL.' }
  }

  updateUser(session.userId, { leetcodeUsername })
  redirect('/settings?saved=1')
}