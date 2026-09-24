'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Gauge, LogIn } from 'lucide-react'
import { login, type AuthState } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, undefined)

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">
            <Gauge size={18} strokeWidth={2.6} />
          </div>
          <span>
            leet<span>track</span>
          </span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account to continue.</p>

        {state?.errors?.form && (
          <div className="auth-error">{state.errors.form[0]}</div>
        )}

        <form action={action} className="auth-form">
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="your_username"
              autoComplete="username"
              required
            />
            {state?.errors?.username && (
              <p className="field-error">{state.errors.username[0]}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            {state?.errors?.password && (
              <p className="field-error">{state.errors.password[0]}</p>
            )}
          </div>

          <button type="submit" className="auth-submit" disabled={pending}>
            <LogIn size={16} />
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
