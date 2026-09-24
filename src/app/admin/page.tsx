import Link from 'next/link'
import { getSession } from '@/app/lib/session'
import { findUserById, getAllUsers, isUserAdmin } from '@/app/lib/users'
import ThemeToggle from '@/app/theme-toggle'
import {
  ArrowUpRight,
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

          <div className="panel" style={{ padding: '24px' }}>
            <div className="panel-heading" style={{ marginBottom: '20px' }}>
              <div>
                <span className="sidebar-label" style={{ padding: 0 }}>User Database</span>
                <h2>Registered Users ({totalUsers})</h2>
              </div>
            </div>

            <div className="problem-table-wrap" style={{ border: 'none' }}>
              <table className="problem-table">
                <thead>
                  <tr>
                    <th className="col-id">User</th>
                    <th className="col-title">LeetCode Handle</th>
                    <th className="col-diff">Total Solved</th>
                    <th className="col-topic">Easy / Med / Hard</th>
                    <th className="col-title">Last Synced</th>
                    <th className="col-link">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u) => {
                    const stats = u.leetcodeStats
                    const solved = stats?.totalSolved ?? 0
                    const easy = stats?.easySolved ?? 0
                    const medium = stats?.mediumSolved ?? 0
                    const hard = stats?.hardSolved ?? 0

                    return (
                      <tr key={u.id} className="problem-row">
                        <td className="col-id" style={{ fontWeight: 700 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="avatar avatar-small">{u.username.slice(0, 2).toUpperCase()}</div>
                            <div>
                              <div style={{ color: 'var(--ink)' }}>{u.username}</div>
                              {u.isAdmin && (
                                <span className="nav-count" style={{ fontSize: '9px', padding: '1px 6px' }}>ADMIN</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="col-title">
                          {u.leetcodeUsername ? (
                            <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>{u.leetcodeUsername}</span>
                          ) : (
                            <span style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '12px' }}>Not configured</span>
                          )}
                        </td>
                        <td className="col-diff">
                          <strong style={{ fontSize: '15px', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                            {solved}
                          </strong>
                        </td>
                        <td className="col-topic">
                          <div style={{ display: 'flex', gap: '6px', fontSize: '11px' }}>
                            <span className="difficulty-badge easy">{easy} E</span>
                            <span className="difficulty-badge medium">{medium} M</span>
                            <span className="difficulty-badge hard">{hard} H</span>
                          </div>
                        </td>
                        <td className="col-title" style={{ fontSize: '12px', color: 'var(--muted)' }}>
                          {u.lastSyncedAt ? new Date(u.lastSyncedAt).toLocaleString() : 'Never'}
                        </td>
                        <td className="col-link">
                          {u.leetcodeUsername ? (
                            <a
                              href={`https://leetcode.com/u/${u.leetcodeUsername}/`}
                              target="_blank"
                              rel="noreferrer"
                              className="row-ext-link"
                              aria-label={`Open ${u.username}'s LeetCode profile`}
                            >
                              <ArrowUpRight size={15} />
                            </a>
                          ) : (
                            <span style={{ color: 'var(--line)' }}>—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
