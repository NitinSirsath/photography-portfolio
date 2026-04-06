import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 py-12 px-8 border-t border-border opacity-60 text-[10px] uppercase tracking-widest text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex gap-24">
          <div className="space-y-4">
            <div className="font-bold mb-6">Platform</div>
            <div className="flex flex-col gap-2">
              <Link href="/artworks" className="hover:text-foreground transition-colors">Artworks</Link>
              <Link href="/photos" className="hover:text-foreground transition-colors">Photo Journals</Link>
              <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-bold mb-6">Account</div>
            <div className="flex flex-col gap-2">
              <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Creator Studio</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            </div>
          </div>
        </div>
        <div className="text-right space-y-4">
          <div className="font-bold mb-6 text-left md:text-right">Legal</div>
          <div className="text-left md:text-right">© {new Date().getFullYear()} Visual Archive Platform</div>
          <div className="text-left md:text-right">All uploaded content belongs to its respective creators.</div>
        </div>
      </div>
    </footer>
  )
}
