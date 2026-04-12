import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <h2 className="font-serif text-6xl font-black mb-4 text-muted-foreground/30">404</h2>
      <p className="text-foreground font-mono text-sm uppercase tracking-widest mb-8 max-w-md font-bold">
        This portfolio or page doesn't exist in the archive.
      </p>
      <Link href="/community" className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs font-mono rounded-full hover:scale-105 transition-transform">
        Return to Community
      </Link>
    </div>
  )
}
