'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { GlobalSearchBar } from '@/components/ui/GlobalSearchBar'
import { NotificationBell } from '@/components/ui/NotificationBell'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function PlatformNavbar() {
  const pathname = usePathname()
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [])

  // Do not render PlatformNavbar on portfolio routes (e.g., /username/...)
  // We assume any route that has more than 1 segment and isn't dashboard/auth/etc. is a username route
  // A simpler way: if the route starts with /dashboard, /community, /login, or is /
  // Let's explicitly define non-portfolio routes for PlatformNavbar
  const isPlatformRoute = pathname === '/' || pathname.startsWith('/community') || pathname.startsWith('/login') || pathname.startsWith('/search')

  if (!isPlatformRoute) {
    return null
  }

  return (
    <header className="absolute top-0 z-50 w-full px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
        <Link href="/" className="w-8 h-8 rounded border border-border flex items-center justify-center font-serif text-foreground hover:bg-white/5 transition-colors text-lg">
          V
        </Link>
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="/community" className="hover:text-foreground transition-colors">
          Community
        </Link>
        <div className="hidden sm:block">
          <GlobalSearchBar />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-4">
          {userId && <NotificationBell userId={userId} />}
          <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}
