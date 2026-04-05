"use client"

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-5 rounded-full border border-border flex items-center px-[2px] transition-colors"
    >
      <div className={`w-3.5 h-3.5 rounded-full bg-muted-foreground flex items-center justify-center transition-transform ${theme === 'dark' ? 'translate-x-[18px]' : ''}`}>
      </div>
    </button>
  )
}
