import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="font-serif text-6xl font-black mb-4 opacity-10">404</h2>
      <p className="text-foreground font-mono text-sm uppercase tracking-widest mb-8 max-w-md font-bold">
        This creator's portfolio doesn't exist yet.
      </p>
      <Link href="/login" className="px-8 py-4 border border-border/50 hover:bg-card font-bold uppercase tracking-widest text-xs font-mono rounded-full transition-colors">
        Claim this Username
      </Link>
    </div>
  )
}
