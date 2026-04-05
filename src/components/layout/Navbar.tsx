import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Navbar() {
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
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  )
}
