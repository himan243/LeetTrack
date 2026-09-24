import { requireAuth } from '@/app/lib/session'
import { findUserById } from '@/app/lib/users'
import DashboardClient from './dashboard-client'

export default async function Home() {
  const session = await requireAuth()
  const user = await findUserById(session.userId)
  return <DashboardClient username={session.username} leetcodeUsername={user?.leetcodeUsername ?? ''} stats={user?.leetcodeStats} lastSyncedAt={user?.lastSyncedAt} />
}
