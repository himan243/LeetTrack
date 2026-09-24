'use server'

import { requireAuth } from '@/app/lib/session'
import { findUserById, updateUser, type LeetCodeStats } from '@/app/lib/users'

export type SyncResult =
  | { ok: true; stats: LeetCodeStats; syncedAt: string; username: string }
  | { ok: false; message: string }

const LEETCODE_ENDPOINT = 'https://leetcode.com/graphql'

const profileQuery = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
    recentAcSubmissionList(username: $username, limit: 100) {
      titleSlug
      timestamp
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`

type ProfileResponse = {
  data?: {
    matchedUser?: {
      username: string
      profile?: { ranking?: number }
      submitStats?: { acSubmissionNum?: Array<{ difficulty: string; count: number }> }
    } | null
    recentAcSubmissionList?: Array<{ titleSlug: string; timestamp: string }>
    allQuestionsCount?: Array<{ difficulty: string; count: number }>
  }
}

export async function syncLeetCode(): Promise<SyncResult> {
  const session = await requireAuth()
  const user = await findUserById(session.userId)
  const username = user?.leetcodeUsername?.trim()

  if (!username) {
    return { ok: false, message: 'Add your LeetCode username in Settings before syncing.' }
  }

  try {
    const response = await fetch(LEETCODE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/',
      },
      body: JSON.stringify({ query: profileQuery, variables: { username } }),
      cache: 'no-store',
    })

    if (!response.ok) {
      return { ok: false, message: `LeetCode returned an error (${response.status}). Try again shortly.` }
    }

    const payload = (await response.json()) as ProfileResponse
    const matchedUser = payload.data?.matchedUser
    if (!matchedUser) {
      return { ok: false, message: `No public LeetCode profile was found for "${username}".` }
    }

    const submissions = Object.fromEntries(
      (matchedUser.submitStats?.acSubmissionNum ?? []).map((entry) => [entry.difficulty, entry.count]),
    )
    const totals = Object.fromEntries(
      (payload.data?.allQuestionsCount ?? []).map((entry) => [entry.difficulty, entry.count]),
    )
    const recentSubmissions = payload.data?.recentAcSubmissionList ?? []
    const recentSlugs = recentSubmissions.map((submission) => submission.titleSlug)
    const recentActivityDates = recentSubmissions.map((submission) => new Date(Number(submission.timestamp) * 1000).toISOString().slice(0, 10))
    const stats: LeetCodeStats = {
      totalSolved: submissions.All ?? 0,
      easySolved: submissions.Easy ?? 0,
      mediumSolved: submissions.Medium ?? 0,
      hardSolved: submissions.Hard ?? 0,
      easyTotal: totals.Easy ?? 0,
      mediumTotal: totals.Medium ?? 0,
      hardTotal: totals.Hard ?? 0,
      ranking: matchedUser.profile?.ranking,
      solvedProblemSlugs: [...new Set([...(user?.leetcodeStats?.solvedProblemSlugs ?? []), ...recentSlugs])],
      activityDates: [...new Set([...(user?.leetcodeStats?.activityDates ?? []), ...recentActivityDates])],
    }
    const syncedAt = new Date().toISOString()
    await updateUser(session.userId, { leetcodeStats: stats, lastSyncedAt: syncedAt })

    return { ok: true, stats, syncedAt, username: matchedUser.username }
  } catch {
    return { ok: false, message: 'Unable to reach LeetCode right now. Check your connection and try again.' }
  }
}