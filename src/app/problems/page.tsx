'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Menu,
  Search,
  Settings2,
  Target,
  X,
} from 'lucide-react'
import { problems, TOPICS, type Problem } from '@/app/lib/problems'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'] as const

export default function ProblemsPage() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<string>('All')
  const [topic, setTopic] = useState<string>('All')
  const [solved, setSolved] = useState<Set<number>>(new Set())
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = useMemo<Problem[]>(() => {
    return problems.filter((p) => {
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty
      const matchTopic = topic === 'All' || p.topic === topic
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchDiff && matchTopic && matchSearch
    })
  }, [search, difficulty, topic])

  function toggleSolved(id: number) {
    setSolved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const solvedCount = solved.size
  const totalCount = problems.length

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
          <button
            className="icon-button sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-label">Workspace</div>
        <nav className="side-nav" aria-label="Main navigation">
          <Link className="side-link" href="/">
            <LayoutDashboard size={17} /> Overview
          </Link>
          <Link className="side-link active" href="/problems">
            <ListChecks size={17} /> Problem list{' '}
            <span className="nav-count">{totalCount}</span>
          </Link>
          <a className="side-link" href="/#activity">
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
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button
            className="icon-button menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="crumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>Problem List</strong>
          </div>
          <div className="topbar-actions">
            <div className="problems-solved-badge">
              {solvedCount} / {totalCount} solved
            </div>
          </div>
        </header>

        <div className="page-wrap">
          <div className="problems-header">
            <div>
              <p className="section-kicker">Curated curriculum</p>
              <h1 className="problems-title">
                {totalCount} problems to master
              </h1>
              <p className="lede">
                Every major topic covered — from Arrays to Dynamic Programming.
                Check off problems as you solve them.
              </p>
            </div>

            <div className="problems-progress-bar-wrap">
              <div className="problems-progress-numbers">
                <span>{solvedCount} solved</span>
                <span>{totalCount - solvedCount} remaining</span>
              </div>
              <div className="problems-progress-track">
                <div
                  className="problems-progress-fill"
                  style={{ width: `${(solvedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="problems-filters">
            <div className="problems-search-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="search"
                className="problems-search"
                placeholder="Search problems or tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <div className="filter-row">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    className={`filter-pill ${difficulty === d ? 'selected' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <select
                className="topic-select"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                aria-label="Filter by topic"
              >
                <option value="All">All topics</option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="results-count">
            {filtered.length} problem{filtered.length !== 1 ? 's' : ''}
            {difficulty !== 'All' || topic !== 'All' || search ? ' matching filters' : ''}
          </p>

          {/* Problem table */}
          <div className="problem-table-wrap">
            <table className="problem-table">
              <thead>
                <tr>
                  <th className="col-check" />
                  <th className="col-id">#</th>
                  <th className="col-title">Title</th>
                  <th className="col-topic">Topic</th>
                  <th className="col-diff">Difficulty</th>
                  <th className="col-link" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`problem-row ${solved.has(p.id) ? 'row-solved' : ''}`}
                  >
                    <td className="col-check">
                      <button
                        className={`row-check-btn ${solved.has(p.id) ? 'is-checked' : ''}`}
                        onClick={() => toggleSolved(p.id)}
                        aria-label={`${solved.has(p.id) ? 'Unmark' : 'Mark'} ${p.title} as solved`}
                      >
                        {solved.has(p.id) && <Check size={12} />}
                      </button>
                    </td>
                    <td className="col-id problem-id">{p.id}</td>
                    <td className="col-title problem-title">{p.title}</td>
                    <td className="col-topic">
                      <span className="topic-tag">{p.topic}</span>
                    </td>
                    <td className="col-diff">
                      <span
                        className={`difficulty-badge ${p.difficulty.toLowerCase()}`}
                      >
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="col-link">
                      <a
                        href={`https://leetcode.com/problems/${p.slug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="row-ext-link"
                        aria-label={`Open ${p.title} on LeetCode`}
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="empty-state">
                <p>No problems match your filters.</p>
                <button
                  className="filter-pill selected"
                  onClick={() => {
                    setSearch('')
                    setDifficulty('All')
                    setTopic('All')
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
