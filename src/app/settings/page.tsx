import Link from 'next/link'
import { ArrowLeft, Gauge, LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { requireAuth } from '@/app/lib/session'
import { findUserById } from '@/app/lib/users'
import SettingsForm from './settings-form'
import ThemeToggle from '@/app/theme-toggle'

export default async function SettingsPage() {
  const session = await requireAuth()
  const user = await findUserById(session.userId)

  return (
    <main className="settings-shell">
      <header className="settings-topbar">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark"><Gauge size={18} strokeWidth={2.6} /></span>
          <span>leet<span>track</span></span>
        </Link>
        <Link className="back-link" href="/"><ArrowLeft size={15} /> Back to overview</Link>
        <ThemeToggle />
      </header>
      <section className="settings-content">
        <p className="section-kicker">Workspace settings</p>
        <h1>Connect your progress</h1>
        <p className="settings-lede">Your public LeetCode username is used to pull solved totals and keep your dashboard current.</p>
        <SettingsForm leetcodeUsername={user?.leetcodeUsername ?? ''} />
        <div className="settings-account panel">
          <div><p className="section-kicker">Account</p><h2>{session.username}</h2><span>Signed in to LeetTrack</span></div>
          <form action={logout}><button className="logout-link" type="submit"><LogOut size={15} /> Log out</button></form>
        </div>
      </section>
    </main>
  )
}