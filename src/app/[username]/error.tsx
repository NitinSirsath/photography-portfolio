'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: 'var(--accent)' }}>Portfolio Unavailable</h2>
      <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mb-8 max-w-md">
        This creator's assets could not be retrieved. {error.message}
      </p>
      <button onClick={() => reset()} className="px-8 py-4 border border-border/50 hover:bg-card font-bold uppercase tracking-widest text-xs font-mono rounded-full transition-colors">
        Try Again
      </button>
    </div>
  )
}
