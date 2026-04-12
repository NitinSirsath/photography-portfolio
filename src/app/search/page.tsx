import prisma from '@/lib/prisma'
import Link from 'next/link'
import { ArtworkCard } from '@/components/ui/ArtworkCard'
import { Users, Image as ImageIcon, Search } from 'lucide-react'

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q || ''

  if (!query) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 text-center">
        <Search size={48} className="text-muted-foreground/20 mb-4" />
        <h1 className="font-serif text-3xl font-bold">Search the Archive</h1>
        <p className="text-muted-foreground mt-2">Enter a name, title, or tag to begin discovery.</p>
      </div>
    )
  }

  // Search Creators
  const creators = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: 'insensitive' } },
        { displayName: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: { _count: { select: { artworks: true, photoSeries: true } } },
    take: 6,
  })

  // Search Artworks
  const artworks = await prisma.artwork.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query.toUpperCase() } },
      ],
    },
    include: { author: true },
    take: 12,
  })

  // Search Photo Series
  const series = await prisma.photoSeries.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: { author: true },
    take: 6,
  })

  const noResults = creators.length === 0 && artworks.length === 0 && series.length === 0

  return (
    <div className="flex-1 pt-32 pb-24 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-16 border-b border-border/50 pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Search Query Result</p>
        <h1 className="font-serif text-5xl font-black italic">"{query}"</h1>
      </div>

      {noResults ? (
        <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl">
          <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No data found matching this signature.</p>
        </div>
      ) : (
        <div className="space-y-24">
          {/* Creators Section */}
          {creators.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <Users size={20} className="text-muted-foreground" />
                <h2 className="font-serif text-2xl font-bold">Creators</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {creators.map(c => (
                  <Link key={c.id} href={`/${c.username}/home`} className="flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl hover:border-foreground/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      {c.avatarUrl ? <img src={c.avatarUrl} alt="" className="w-full h-full object-cover" /> : <span className="font-bold">{c.username[0].toUpperCase()}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold truncate">{c.displayName || c.username}</p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">@{c.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Artworks Section */}
          {artworks.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <ImageIcon size={20} className="text-muted-foreground" />
                <h2 className="font-serif text-2xl font-bold">Artworks</h2>
              </div>
              <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {artworks.map(a => (
                  <div key={a.id} className="break-inside-avoid relative group">
                    <ArtworkCard 
                      id={a.id} 
                      title={a.title} 
                      description={a.description} 
                      imageUrl={a.imageUrl} 
                      aspectRatio={a.aspectRatio} 
                      className="rounded-xl border border-transparent group-hover:border-foreground/20 transition-colors"
                    />
                    <Link href={`/${a.author.username}/home`} className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      @{a.author.username}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Series Section */}
          {series.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <ImageIcon size={20} className="text-muted-foreground" />
                <h2 className="font-serif text-2xl font-bold">Photo Journals</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {series.map(s => (
                  <Link key={s.id} href={`/${s.author.username}/photos`} className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-card">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${s.coverImage})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-white/60 mb-1">@{s.author.username}</p>
                      <h3 className="font-serif text-xl font-bold">{s.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
