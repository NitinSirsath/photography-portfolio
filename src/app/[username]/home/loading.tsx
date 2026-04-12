export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-8 max-w-7xl mx-auto">
      <div className="flex gap-12 items-center mb-24">
        <div className="w-40 h-40 rounded-full bg-muted animate-pulse flex-shrink-0" />
        <div className="space-y-4 flex-1">
          <div className="h-16 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
