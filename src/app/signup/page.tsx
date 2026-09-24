'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Gauge, UserPlus } from 'lucide-react'
import { signup, type AuthState } from '@/app/actions/auth'

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, undefined)

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

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start tracking your LeetCode progress today.</p>

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
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              required
            />
            {state?.errors?.password && (
              <p className="field-error">{state.errors.password[0]}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="leetcodeUsername">
              LeetCode username <span className="field-optional">(optional)</span>
            </label>
            <input
              id="leetcodeUsername"
              name="leetcodeUsername"
              type="text"
              placeholder="e.g. john_doe"
              autoComplete="off"
            />
            {state?.errors?.leetcodeUsername && (
              <p className="field-error">{state.errors.leetcodeUsername[0]}</p>
            )}
            <p className="field-hint">
              Used to link your LeetCode profile. You can add this later.
            </p>
          </div>

          <button type="submit" className="auth-submit" disabled={pending}>
            <UserPlus size={16} />
            {pending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
