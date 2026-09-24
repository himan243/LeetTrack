import Link from 'next/link'
import { getSession } from '@/app/lib/session'
import { findUserById, getAllUsers, isUserAdmin } from '@/app/lib/users'
import ThemeToggle from '@/app/theme-toggle'
import AdminUserTable from './admin-user-table'
import {
  CheckCircle2,
  Clock,
  Gauge,
  ShieldAlert,
  Users,
} from 'lucide-react'

export default async function AdminPage() {
  const session = await getSession()
  const currentUser = session ? await findUserById(session.userId) : null
  const admin = isUserAdmin(currentUser)

  if (!admin) {
    return (
      <main className="app-shell" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: '24px' }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '440px',
          width: '100%',
          padding: '40px 32px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'var(--soft-coral)',
            color: 'var(--coral)',
            display: 'grid',
            placeItems: 'center',
          }}>
            <ShieldAlert size={28} />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            marginBottom: '8px',
            letterSpacing: '-1px',
          }}>
            403 - Forbidden
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
            Access Denied: You do not have administrative privileges to view this page.
          </p>
          <Link
            href="/"
            className="filter-pill selected"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '12px' }}
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  const allUsers = await getAllUsers()
  const totalUsers = allUsers.length
  const totalProblemsSolvedAllUsers = allUsers.reduce(
    (acc, user) => acc + (user.leetcodeStats?.totalSolved ?? 0),
    0,
  )
  const syncedUsersCount = allUsers.filter((u) => u.lastSyncedAt).length

  return (
    <main className="app-shell">
      <section className="main-content" style={{ width: '100%' }}>
        <header className="topbar">
          <div className="crumb">
            <div className="brand-mark" style={{ width: '24px', height: '24px', borderRadius: '6px' }}>
              <Gauge size={14} strokeWidth={2.6} />
            </div>
            <strong>Admin Control Panel</strong>
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
            <Link href="/" className="sync-button">
              Return to App
            </Link>
          </div>
        </header>

        <div className="page-wrap">
          <div className="welcome-row" style={{ marginBottom: '32px' }}>
            <div>
              <p className="eyebrow">
                <span className="status-dot" style={{ background: 'var(--mint-dark)' }} />
                System Administration
              </p>
              <h1>User Profiles & Stats</h1>
              <p className="lede">
                Overview of registered users, their LeetCode handles, and problem-solving progress.
              </p>
            </div>
          </div>

          <div className="metric-grid" style={{ marginBottom: '32px' }}>
            <div className="metric-card">
              <div className="metric-icon mint">
                <Users size={18} />
              </div>
              <div className="metric-label">Registered Accounts</div>
              <div className="metric-value">{totalUsers}</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon gold">
                <CheckCircle2 size={18} />
              </div>
              <div className="metric-label">Total Solved Across Users</div>
              <div className="metric-value">{totalProblemsSolvedAllUsers}</div>
            </div>

            <div className="metric-card">
              <div className="metric-icon coral">
                <Clock size={18} />
              </div>
              <div className="metric-label">Synced Accounts</div>
              <div className="metric-value">{syncedUsersCount}</div>
            </div>
          </div>

          <AdminUserTable initialUsers={allUsers} />
        </div>
      </section>
    </main>
  )
}
