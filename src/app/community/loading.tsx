export default function Loading() {
  return (
    <div className="flex-1 pt-32 pb-24 px-4 bg-background max-w-7xl mx-auto w-full">
      <div className="h-12 w-64 bg-muted animate-pulse rounded mb-16 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
