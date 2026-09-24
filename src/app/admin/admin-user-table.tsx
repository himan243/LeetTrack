'use client'

import { useState } from 'react'
import { syncUserLeetCode } from '@/app/actions/leetcode'
import type { User } from '@/app/lib/users'
import { ArrowUpRight, RefreshCw } from 'lucide-react'

export default function AdminUserTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [syncingId, setSyncingId] = useState<string | null>(null)
  const [syncingAll, setSyncingAll] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSync(userId: string) {
    setMessage(null)
    setSyncingId(userId)
    const res = await syncUserLeetCode(userId)
    setSyncingId(null)

    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, leetcodeStats: res.stats, lastSyncedAt: res.syncedAt }
            : u,
        ),
      )
      setMessage(`Successfully synced profile for ${res.username}`)
    } else {
      setMessage(`Sync failed: ${res.message}`)
    }
  }

  async function handleSyncAll() {
    setMessage(null)
    setSyncingAll(true)
    let syncedCount = 0
    let failedCount = 0

    const usersToSync = users.filter((u) => u.leetcodeUsername)

    for (const u of usersToSync) {
      setSyncingId(u.id)
      const res = await syncUserLeetCode(u.id)
      if (res.ok) {
        syncedCount++
        setUsers((prev) =>
          prev.map((item) =>
            item.id === u.id
              ? { ...item, leetcodeStats: res.stats, lastSyncedAt: res.syncedAt }
              : item,
          ),
        )
      } else {
        failedCount++
      }
    }

    setSyncingId(null)
    setSyncingAll(false)
    setMessage(`Finished syncing ${syncedCount} account(s).${failedCount ? ` ${failedCount} failed.` : ''}`)
  }

  return (
    <div className="panel" style={{ padding: '24px' }}>
      <div className="panel-heading" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="sidebar-label" style={{ padding: 0 }}>User Database</span>
          <h2>Registered Users ({users.length})</h2>
        </div>
        <button
          className="sync-button"
          onClick={handleSyncAll}
          disabled={syncingAll || Boolean(syncingId)}
        >
          <RefreshCw size={13} className={syncingAll ? 'spin' : ''} />
          {syncingAll ? 'Syncing all...' : 'Sync all users'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '10px 14px',
          marginBottom: '16px',
          borderRadius: '8px',
          fontSize: '12px',
          background: message.includes('failed') || message.includes('Forbidden') ? 'var(--soft-coral)' : 'var(--soft-mint)',
          color: message.includes('failed') || message.includes('Forbidden') ? 'var(--coral)' : 'var(--mint-dark)',
          border: '1px solid var(--line)',
        }}>
          {message}
        </div>
      )}

      <div className="problem-table-wrap" style={{ border: 'none' }}>
        <table className="problem-table">
          <thead>
            <tr>
              <th className="col-id">User</th>
              <th className="col-title">LeetCode Handle</th>
              <th className="col-diff">Total Solved</th>
              <th className="col-topic">Easy / Med / Hard</th>
              <th className="col-title">Last Synced</th>
              <th className="col-link">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const stats = u.leetcodeStats
              const solved = stats?.totalSolved ?? 0
              const easy = stats?.easySolved ?? 0
              const medium = stats?.mediumSolved ?? 0
              const hard = stats?.hardSolved ?? 0
              const isSyncingThis = syncingId === u.id

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        className="select-button"
                        style={{ height: '28px', padding: '0 8px', fontSize: '11px' }}
                        disabled={!u.leetcodeUsername || isSyncingThis || syncingAll}
                        onClick={() => handleSync(u.id)}
                        title={!u.leetcodeUsername ? 'No LeetCode handle set' : 'Sync LeetCode stats for this user'}
                      >
                        <RefreshCw size={11} className={isSyncingThis ? 'spin' : ''} />
                        {isSyncingThis ? 'Syncing...' : 'Sync'}
                      </button>
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
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
