import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { GlobalSearchBar } from '@/components/ui/GlobalSearchBar'
import { NotificationBell } from '@/components/ui/NotificationBell'

export async function PortfolioNavbar({ username, profileConfig }: { username: string, profileConfig: any }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let loggedInUser = null
  if (user) {
    loggedInUser = await prisma.user.findUnique({ where: { id: user.id } })
  }

  const isOwner = loggedInUser?.username === username

  const logoText = profileConfig?.logoText || username.substring(0, 1).toUpperCase()
  const accentColor = profileConfig?.accentColor || "#ffffff"

  return (
    <>
      <header className="absolute top-0 z-50 w-full px-8 py-6 flex items-center justify-between" style={{ '--accent': accentColor } as React.CSSProperties}>
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          <Link href={`/${username}/home`} className="w-8 h-8 rounded border border-border flex items-center justify-center font-serif text-foreground hover:bg-white/5 transition-colors text-lg" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            {logoText}
          </Link>
          <Link href={`/${username}/home`} className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>
          <Link href={`/${username}/photos`} className="hover:text-[var(--accent)] transition-colors">
            Photos
          </Link>
          <Link href={`/${username}/artworks`} className="hover:text-[var(--accent)] transition-colors">
            Artworks
          </Link>
          <Link href={`/${username}/about`} className="hover:text-[var(--accent)] transition-colors">
            About
          </Link>
          {isOwner && (
            <Link href={`/${username}/settings`} className="hover:text-[var(--accent)] transition-colors">
              ⚙ Settings
            </Link>
          )}
          <div className="hidden md:block ml-4">
            <GlobalSearchBar />
          </div>
        </div>
        <div className="flex items-center gap-6">
          {loggedInUser && <NotificationBell userId={loggedInUser.id} />}
          <Link href="/community" className="text-[11px] font-bold tracking-widest uppercase border border-border/50 px-4 py-2 rounded-full hover:bg-card transition-colors">
            ← Back to Community
          </Link>

          {!isOwner && loggedInUser && (
            <div className="flex items-center gap-2 border border-border/50 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {loggedInUser.avatarUrl ? (
                 <img src={loggedInUser.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
              ) : (
                 <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center">{loggedInUser.username[0].toUpperCase()}</span>
              )}
              <span className="text-muted-foreground">Viewing as @{loggedInUser.username}</span>
            </div>
          )}
        </div>
      </header>

      {isOwner && (
        <Link href="/dashboard" className="fixed bottom-8 right-8 z-50 bg-foreground text-background px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform">
          Creator Studio
        </Link>
      )}
    </>
  )
}
