import prisma from '@/lib/prisma'
import { ArtworkCard } from '@/components/ui/ArtworkCard'
import { Tag } from 'lucide-react'
import Link from 'next/link'

export default async function TagDiscoveryPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const tagUpper = tag.toUpperCase()

  const artworks = await prisma.artwork.findMany({
    where: {
      isPublished: true,
      tags: { has: tagUpper }
    },
    include: { author: true }
  })

  // Since PhotoSeries doesn't have tags in the schema yet, we only show artworks
  // or we could search description for the tag if we wanted to be broad.
  // For now, let's stick to the Artwork tags as they are structured.

  return (
    <div className="flex-1 pt-32 pb-24 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-16 border-b border-border/50 pb-8 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">Tag Discovery Archive</p>
          <h1 className="font-serif text-5xl font-black flex items-center gap-4">
            <Tag size={40} className="text-muted-foreground/30" />
            #{tagUpper}
          </h1>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Assets</p>
          <p className="text-3xl font-serif font-black">{artworks.length}</p>
        </div>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl">
          <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No assets categorized under this signature.</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-3 lg:columns-4 gap-8 space-y-8">
          {artworks.map(a => (
            <div key={a.id} className="break-inside-avoid relative group">
              <ArtworkCard 
                id={a.id} 
                title={a.title} 
                description={a.description} 
                imageUrl={a.imageUrl} 
                aspectRatio={a.aspectRatio} 
                className="rounded-2xl shadow-xl hover:border-foreground/20 transition-all"
              />
              <Link href={`/${a.author.username}/home`} className="absolute bottom-4 left-4 z-10 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105">
                {a.author.avatarUrl ? (
                  <img src={a.author.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-foreground/10 flex items-center justify-center text-[8px] font-bold">{a.author.username[0].toUpperCase()}</span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest">@{a.author.username}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
