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
import { useState } from 'react'
import { logout } from '@/app/actions/auth'

const recommendations = [
  { title: 'Valid Parentheses', id: '20', difficulty: 'Easy', topic: 'Stack', reason: 'Build your fundamentals' },
  { title: 'Binary Tree Level Order Traversal', id: '102', difficulty: 'Medium', topic: 'Trees', reason: 'Good next step for you' },
  { title: 'Word Ladder', id: '127', difficulty: 'Hard', topic: 'BFS', reason: 'Stretch your graph skills' },
]

const bars = [38, 58, 44, 72, 54, 88, 61, 95, 76, 48, 82, 68]

export default function DashboardClient({ username }: { username: string }) {
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [completed, setCompleted] = useState<string[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = username.slice(0, 2).toUpperCase()

  const visibleRecommendations = recommendations.filter((problem) => {
    return activeDifficulty === 'All' || problem.difficulty === activeDifficulty
  })

  function syncProgress() {
    setIsSyncing(true)
    window.setTimeout(() => setIsSyncing(false), 900)
  }

  function toggleComplete(problemId: string) {
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
          <a className="side-link" href="#settings">
            <Settings2 size={17} /> Settings
          </a>
          <div className="profile-mini">
            <div className="avatar">{initials}</div>
            <div>
              <strong>{username}</strong>
              <span>LeetCode connected</span>
            </div>
            <form action={logout} style={{ marginLeft: 'auto' }}>
              <button type="submit" className="icon-button" aria-label="Log out" title="Log out">
                <LogOut size={15} />
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
            <button className="sync-button" onClick={syncProgress} disabled={isSyncing}>
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
                <strong>14 days</strong>
                <span>current streak</span>
              </div>
              <div className="streak-divider" />
              <div>
                <strong>28 days</strong>
                <span>best streak</span>
              </div>
            </div>
          </section>

          <section className="metric-grid" aria-label="Progress summary">
            <MetricCard label="Solved problems" value="184" trend="+12 this month" icon={<Check size={18} />} tone="mint" />
            <MetricCard label="Total progress" value="36.8%" trend="184 of 500 solved" icon={<Trophy size={18} />} tone="gold" progress={36.8} />
            <MetricCard label="This week" value="9" trend="3 more than last week" icon={<Sparkles size={18} />} tone="coral" />
          </section>

          <section className="dashboard-grid">
            <div className="panel activity-panel" id="activity">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Momentum</p>
                  <h2>Your solving rhythm</h2>
                </div>
                <button className="select-button">
                  Last 12 weeks <ChevronDown size={15} />
                </button>
              </div>
              <div className="chart-wrap">
                <div className="chart-y-labels">
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div className="bar-chart" aria-label="Bar chart showing weekly solved problems">
                  {bars.map((height, index) => (
                    <div className="bar-column" key={index}>
                      <div className="bar" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-caption">
                <span>
                  <i className="legend-dot" />
                  Problems solved
                </span>
                <span>
                  Average <strong>7.4 / week</strong>
                </span>
              </div>
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
                <div className="donut">
                  <div>
                    <strong>184</strong>
                    <span>solved</span>
                  </div>
                </div>
              </div>
              <div className="difficulty-list">
                <DifficultyRow label="Easy" value="92" percent="50%" color="var(--mint)" />
                <DifficultyRow label="Medium" value="76" percent="41%" color="var(--coral)" />
                <DifficultyRow label="Hard" value="16" percent="9%" color="var(--ink)" />
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
                <h2>200 problems solved</h2>
                <span>16 more to unlock your next badge</span>
              </div>
            </div>
            <div className="milestone-track">
              <div className="milestone-line">
                <span style={{ width: '92%' }} />
              </div>
              <div className="milestone-numbers">
                <span>184</span>
                <strong>200</strong>
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
              {visibleRecommendations.map((problem) => (
                <RecommendationCard
                  key={problem.id}
                  problem={problem}
                  completed={completed.includes(problem.id)}
                  onComplete={() => toggleComplete(problem.id)}
                />
              ))}
            </div>
          </section>

          <footer className="footer-note">
            <span>Last synced 8 minutes ago</span>
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
          href={`https://leetcode.com/problems/${problem.title.toLowerCase().replaceAll(' ', '-')}/`}
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
