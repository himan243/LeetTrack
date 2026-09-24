'use client'

import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Flame,
  Gauge,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { logout } from '@/app/actions/auth'
import { syncLeetCode } from '@/app/actions/leetcode'
import type { LeetCodeStats } from '@/app/lib/users'
import { problems } from '@/app/lib/problems'
import ThemeToggle from './theme-toggle'

const recommendations = problems.map((problem) => ({
  ...problem,
  reason: problem.difficulty === 'Easy'
    ? 'Build your fundamentals'
    : problem.difficulty === 'Medium'
      ? 'Good next step for you'
      : 'Stretch your problem-solving skills',
}))

export default function DashboardClient({ username, leetcodeUsername, stats: initialStats, lastSyncedAt: initialLastSyncedAt }: { username: string; leetcodeUsername: string; stats?: LeetCodeStats; lastSyncedAt?: string }) {
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [completed, setCompleted] = useState<number[]>([])
  const [isSyncing, startSync] = useTransition()
  const [menuOpen, setMenuOpen] = useState(false)
  const [stats, setStats] = useState(initialStats)
  const [lastSyncedAt, setLastSyncedAt] = useState(initialLastSyncedAt)
  const [syncMessage, setSyncMessage] = useState('')

  const initials = username.slice(0, 2).toUpperCase()

  function syncProgress() {
    setSyncMessage('')
    startSync(async () => {
      const result = await syncLeetCode()
      if (result.ok) {
        setStats(result.stats)
        setLastSyncedAt(result.syncedAt)
        setSyncMessage(`Synced ${result.username}`)
      } else {
        setSyncMessage(result.message)
      }
    })
  }

  const totalSolved = stats?.totalSolved ?? 0
  const solvedProblemSlugs = new Set(stats?.solvedProblemSlugs ?? [])
  const totalProblems = (stats?.easyTotal ?? 0) + (stats?.mediumTotal ?? 0) + (stats?.hardTotal ?? 0)
  const progress = totalProblems ? (totalSolved / totalProblems) * 100 : 0
  const milestoneTarget = 200
  const milestoneProgress = Math.min((totalSolved / milestoneTarget) * 100, 100)
  const { currentStreak, bestStreak } = getStreaks(stats?.activityDates ?? [])
  const thisWeekSolved = countThisWeek(stats?.activityDates ?? [])
  const activityGrid = buildActivityGrid(stats?.activityDates ?? [])
  const easyShare = totalSolved ? ((stats?.easySolved ?? 0) / totalSolved) * 100 : 0
  const mediumShare = totalSolved ? ((stats?.mediumSolved ?? 0) / totalSolved) * 100 : 0
  const hardShare = totalSolved ? ((stats?.hardSolved ?? 0) / totalSolved) * 100 : 0
  const donutStyle = {
    background: `conic-gradient(var(--mint) 0 ${easyShare}%, var(--coral) ${easyShare}% ${easyShare + mediumShare}%, var(--ink) ${easyShare + mediumShare}% ${easyShare + mediumShare + hardShare}%)`,
  }
  const syncLabel = lastSyncedAt ? `Last synced ${new Date(lastSyncedAt).toLocaleString()}` : 'Not synced yet'
  const visibleRecommendations = recommendations.filter((problem) => {
    const matchesDifficulty = activeDifficulty === 'All' || problem.difficulty === activeDifficulty
    return matchesDifficulty && !solvedProblemSlugs.has(problem.slug)
  }).slice(0, 6)

  function toggleComplete(problemId: number) {
    setCompleted((current) =>
      current.includes(problemId)
        ? current.filter((id) => id !== problemId)
        : [...current, problemId],
    )
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark">
            <Gauge size={18} strokeWidth={2.6} />
          </div>
          <span>
            leet<span>track</span>
          </span>
          <button className="icon-button sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-label">Workspace</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="side-link active" href="#progress">
            <LayoutDashboard size={17} /> Overview
          </a>
          <Link className="side-link" href="/problems">
            <ListChecks size={17} /> Problem list <span className="nav-count">150+</span>
          </Link>
          <a className="side-link" href="#activity">
            <BookOpen size={17} /> Activity
          </a>
        </nav>

        <div className="sidebar-label spaced-label">Your focus</div>
        <div className="focus-card">
          <div className="focus-icon">
            <Target size={17} />
          </div>
          <div>
            <strong>Interview prep</strong>
            <span>12 day sprint</span>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <div className="sidebar-bottom">
          <Link className="side-link" href="/settings">
            <Settings2 size={17} /> Settings
          </Link>
          <div className="profile-mini">
            <div className="avatar">{initials}</div>
            <div>
              <strong>{username}</strong>
              <span>LeetCode connected</span>
            </div>
            <form action={logout} className="logout-form">
              <button type="submit" className="logout-button">
                <LogOut size={14} /> Log out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button className="icon-button menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div className="crumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>Overview</strong>
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
            <button className="sync-button" onClick={syncProgress} disabled={isSyncing || !leetcodeUsername} title={!leetcodeUsername ? 'Add your LeetCode username in Settings first' : undefined}>
              <RefreshCw size={15} className={isSyncing ? 'spin' : ''} /> {isSyncing ? 'Syncing' : 'Sync progress'}
            </button>
            <button className="icon-button" aria-label="Search">
              <Search size={18} />
            </button>
            <div className="avatar avatar-small">{initials}</div>
          </div>
        </header>

        <div className="page-wrap">
          <section className="welcome-row" id="progress">
            <div>
              <p className="eyebrow">
                <span className="status-dot" /> Welcome back, {username}
              </p>
              <h1>
                Keep the streak
                <br />
                <em>alive.</em>
              </h1>
              <p className="lede">You&apos;re building a strong rhythm. Here&apos;s the clearest next step.</p>
            </div>
            <div className="streak-hero">
              <div className="streak-flame">
                <Flame size={27} fill="currentColor" />
              </div>
              <div>
                <strong>{currentStreak} days</strong>
                <span>current streak</span>
              </div>
              <div className="streak-divider" />
              <div>
                <strong>{bestStreak} days</strong>
                <span>best streak</span>
              </div>
            </div>
          </section>

          <section className="metric-grid" aria-label="Progress summary">
            <MetricCard label="Solved problems" value={String(totalSolved)} trend={stats ? 'From LeetCode profile' : 'Connect your profile to begin'} icon={<Check size={18} />} tone="mint" />
            <MetricCard label="Total progress" value={`${progress.toFixed(1)}%`} trend={totalProblems ? `${totalSolved} of ${totalProblems} solved` : 'Waiting for first sync'} icon={<Trophy size={18} />} tone="gold" progress={progress} />
            <MetricCard label="This week" value={String(thisWeekSolved)} trend="Accepted submissions" icon={<Sparkles size={18} />} tone="coral" />
          </section>

          <section className="dashboard-grid">
            <div className="panel activity-panel" id="activity">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Activity</p>
                  <h2>Your solving rhythm</h2>
                </div>
                <button className="select-button">
                  Last 12 weeks <ChevronDown size={15} />
                </button>
              </div>
              <div className="activity-grid-wrap">
                <div className="activity-months" aria-hidden="true"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
                <div className="activity-grid" aria-label="GitHub-style activity grid showing accepted submissions">
                  {activityGrid.map((day) => <span key={day.date} className={`activity-cell level-${day.level}`} title={`${day.date}: ${day.level ? 'Solved a problem' : 'No activity'}`} />)}
                </div>
              </div>
              <div className="chart-caption"><span><i className="legend-dot" /> Accepted activity</span><span>{stats?.activityDates?.length ?? 0} active days</span></div>
            </div>

            <div className="panel breakdown-panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Coverage</p>
                  <h2>Difficulty split</h2>
                </div>
                <button className="more-button" aria-label="More difficulty options">
                  •••
                </button>
              </div>
              <div className="donut-wrap">
                <div className="donut" style={donutStyle}>
                  <div>
                    <strong>{totalSolved}</strong>
                    <span>solved</span>
                  </div>
                </div>
              </div>
              <div className="difficulty-list">
                <DifficultyRow label="Easy" value={String(stats?.easySolved ?? 0)} percent={stats?.easyTotal ? `${Math.round(((stats.easySolved ?? 0) / stats.easyTotal) * 100)}%` : '—'} color="var(--mint)" />
                <DifficultyRow label="Medium" value={String(stats?.mediumSolved ?? 0)} percent={stats?.mediumTotal ? `${Math.round(((stats.mediumSolved ?? 0) / stats.mediumTotal) * 100)}%` : '—'} color="var(--coral)" />
                <DifficultyRow label="Hard" value={String(stats?.hardSolved ?? 0)} percent={stats?.hardTotal ? `${Math.round(((stats.hardSolved ?? 0) / stats.hardTotal) * 100)}%` : '—'} color="var(--ink)" />
              </div>
            </div>
          </section>

          <section className="progress-strip panel">
            <div className="progress-copy">
              <div className="milestone-icon">
                <Trophy size={18} />
              </div>
              <div>
                <p className="section-kicker">Next milestone</p>
                <h2>{milestoneTarget} problems solved</h2>
                <span>{Math.max(milestoneTarget - totalSolved, 0)} more to unlock your next badge</span>
              </div>
            </div>
            <div className="milestone-track">
              <div className="milestone-line">
                <span style={{ width: `${milestoneProgress}%` }} />
              </div>
              <div className="milestone-numbers">
                <span>{totalSolved}</span>
                <strong>{milestoneTarget}</strong>
              </div>
            </div>
            <button className="arrow-button" aria-label="View milestone">
              <ArrowUpRight size={19} />
            </button>
          </section>

          <section className="recommendation-section" id="recommendations">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Curated for your growth</p>
                <h2>What to solve next</h2>
                <p className="section-description">A small, intentional queue based on your progress and pace.</p>
              </div>
              <Link className="text-link" href="/problems">
                View all problems <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="filter-row" role="group" aria-label="Filter recommendations by difficulty">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  className={`filter-pill ${activeDifficulty === diff ? 'selected' : ''}`}
                  onClick={() => setActiveDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
            <div className="recommendation-grid">
              {visibleRecommendations.length > 0 ? visibleRecommendations.map((problem) => (
                <RecommendationCard
                  key={problem.id}
                  problem={problem}
                  completed={completed.includes(problem.id)}
                  onComplete={() => toggleComplete(problem.id)}
                />
              )) : <p className="recommendation-empty">No unsolved recommendations in this difficulty yet. View the full problem list to choose another.</p>}
            </div>
          </section>

          <footer className="footer-note">
            <span>{syncMessage || syncLabel}</span>
            <span className="footer-dot" />
            <span>
              Data from{' '}
              <a href="https://leetcode.com" target="_blank" rel="noreferrer">
                leetcode.com
              </a>
            </span>
          </footer>
        </div>
      </section>
    </main>
  )
}

function MetricCard({
  label,
  value,
  trend,
  icon,
  tone,
  progress,
}: {
  label: string
  value: string
  trend: string
  icon: React.ReactNode
  tone: string
  progress?: number
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {progress ? (
        <div className="mini-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      <div className="metric-trend">{trend}</div>
    </article>
  )
}

function getStreaks(activityDates: string[]) {
  const dates = new Set(activityDates)
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().slice(0, 10)
  let currentStreak = 0
  const cursor = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))

  while (dates.has(formatDate(cursor))) {
    currentStreak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  const sortedDates = [...dates].sort()
  let bestStreak = 0
  let runningStreak = 0
  let previousDate = ''

  for (const date of sortedDates) {
    const currentDate = new Date(`${date}T00:00:00Z`)
    const previous = previousDate ? new Date(`${previousDate}T00:00:00Z`) : null
    const dayGap = previous ? Math.round((currentDate.getTime() - previous.getTime()) / 86400000) : 0
    runningStreak = dayGap === 1 ? runningStreak + 1 : 1
    bestStreak = Math.max(bestStreak, runningStreak)
    previousDate = date
  }

  return { currentStreak, bestStreak }
}

function countThisWeek(activityDates: string[]) {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(today.getDate() - dayOfWeek)
  const startDate = startOfWeek.toISOString().slice(0, 10)
  const endDate = today.toISOString().slice(0, 10)
  return activityDates.filter((date) => date >= startDate && date <= endDate).length
}

function buildActivityGrid(activityDates: string[]) {
  const activeDates = new Set(activityDates)
  const today = new Date()
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 83)

  return Array.from({ length: 84 }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(start.getUTCDate() + index)
    const formatted = date.toISOString().slice(0, 10)
    return { date: formatted, level: activeDates.has(formatted) ? 1 : 0 }
  })
}

function DifficultyRow({
  label,
  value,
  percent,
  color,
}: {
  label: string
  value: string
  percent: string
  color: string
}) {
  return (
    <div className="difficulty-row">
      <span className="difficulty-name">
        <i style={{ background: color }} />
        {label}
      </span>
      <strong>{value}</strong>
      <span className="difficulty-percent">{percent}</span>
    </div>
  )
}

function RecommendationCard({
  problem,
  completed,
  onComplete,
}: {
  problem: (typeof recommendations)[number]
  completed: boolean
  onComplete: () => void
}) {
  return (
    <article className={`recommendation-card ${completed ? 'completed' : ''}`}>
      <div className="card-topline">
        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
        <button
          className={`complete-button ${completed ? 'is-complete' : ''}`}
          onClick={onComplete}
          aria-label={`${completed ? 'Unmark' : 'Mark'} ${problem.title} as complete`}
        >
          {completed ? <Check size={15} /> : <span />}
        </button>
      </div>
      <h3>{problem.title}</h3>
      <p className="recommendation-reason">
        <Sparkles size={14} /> {problem.reason}
      </p>
      <div className="card-footer">
        <span>
          {problem.topic} <span className="footer-dot" /> #{problem.id}
        </span>
        <a
          href={`https://leetcode.com/problems/${problem.slug}/`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${problem.title} on LeetCode`}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  )
}
