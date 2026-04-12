export default function Loading() {
  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto px-4 py-32">
      <div className="h-16 w-64 bg-muted animate-pulse rounded mb-16 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
