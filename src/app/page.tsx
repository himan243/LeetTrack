import { requireAuth } from '@/app/lib/session'
import DashboardClient from './dashboard-client'

export default async function Home() {
  const session = await requireAuth()
  return <DashboardClient username={session.username} />
}
