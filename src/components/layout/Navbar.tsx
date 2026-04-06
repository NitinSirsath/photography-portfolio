import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { createClient } from '@/lib/supabase/server'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="absolute top-0 z-50 w-full px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
        <Link href="/" className="w-8 h-8 rounded border border-border flex items-center justify-center font-serif text-foreground hover:bg-white/5 transition-colors text-lg">
          N
        </Link>
        <Link href="/artworks" className="hover:text-foreground transition-colors">
          Artworks
        </Link>
        <Link href="/photos" className="hover:text-foreground transition-colors">
          Photos
        </Link>
        <Link href="/community" className="hover:text-foreground transition-colors">
          Community
        </Link>
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-[11px] font-bold tracking-widest uppercase">
          {user ? (
            <Link href="/dashboard" className="text-foreground hover:text-muted-foreground border-b border-foreground/30 pb-1 transition-colors">
              Studio
            </Link>
          ) : (
            <Link href="/login" className="text-green-500 hover:text-green-400 transition-colors">
              Connect
            </Link>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
