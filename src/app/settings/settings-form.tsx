'use client'

import { useActionState } from 'react'
import { Save } from 'lucide-react'
import { updateSettings, type SettingsState } from '@/app/actions/settings'

export default function SettingsForm({ leetcodeUsername }: { leetcodeUsername: string }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(updateSettings, undefined)

  return (
    <form className="settings-form panel" action={action}>
      <div className="field-group">
        <label htmlFor="leetcodeUsername">LeetCode username</label>
        <input id="leetcodeUsername" name="leetcodeUsername" defaultValue={leetcodeUsername} placeholder="e.g. neal_wu" autoComplete="off" />
        <p className="field-hint">Your profile must be public so LeetTrack can read your solved counts.</p>
        {state?.error && <p className="field-error">{state.error}</p>}
      </div>
      <div className="settings-form-footer">
        <span>{state?.success ?? 'Save your username, then use Sync progress on the dashboard.'}</span>
        <button className="auth-submit settings-submit" type="submit" disabled={pending}><Save size={15} /> {pending ? 'Saving…' : 'Save username'}</button>
      </div>
    </form>
  )
}