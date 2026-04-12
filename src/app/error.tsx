'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <h2 className="font-serif text-4xl font-bold mb-4">Architecture Failure</h2>
      <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mb-8 max-w-md">
        An error occurred while rendering this sector. {error.message}
      </p>
      <button onClick={() => reset()} className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs font-mono rounded-full hover:scale-105 transition-transform">
        Reboot Sequence
      </button>
    </div>
  )
}
