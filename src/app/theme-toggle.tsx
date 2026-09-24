'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('leettrack-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = savedTheme ? savedTheme === 'dark' : prefersDark
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    const frame = window.requestAnimationFrame(() => setIsDark(dark))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('leettrack-theme', nextTheme)
    setIsDark(!isDark)
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} title={isDark ? 'Light mode' : 'Dark mode'}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}