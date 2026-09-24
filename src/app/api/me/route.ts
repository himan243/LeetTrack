import { NextResponse } from 'next/server'
import { getSession } from '@/app/lib/session'
import { findUserById } from '@/app/lib/users'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await findUserById(session.userId)
  return NextResponse.json({
    totalSolved: user?.leetcodeStats?.totalSolved ?? 0,
    solvedProblemSlugs: user?.leetcodeStats?.solvedProblemSlugs ?? [],
  })
}