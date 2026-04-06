import prisma from '@/lib/prisma'
import { ArtworkCard } from '@/components/ui/ArtworkCard'
import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Camera } from 'lucide-react'

export const revalidate = 60

// Unified type for merging artworks and photo series into one timeline
type MediaNode = {
  id: string
  title: string
  description: string
  imageUrl: string
  type: 'artwork' | 'photo-series'
  aspectRatio?: string
  createdAt: Date
  author: { username: string; avatarUrl: string | null; displayName: string | null }
  likesCount: number
  isLikedByMe: boolean
}

export default async function Home() {
  // 1. Identify logged-in user (optional — for appreciation state)
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
  )
  const { data: { user: authUser } } = await supabase.auth.getUser()

  // 2. Query both content types in parallel
  const [artworks, photoSeries] = await Promise.all([
    prisma.artwork.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        author: { select: { username: true, avatarUrl: true, displayName: true } },
        likes: true
      }
    }),
    prisma.photoSeries.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        author: { select: { username: true, avatarUrl: true, displayName: true } },
        likes: true
      }
    })
  ])

  // 3. Merge into a unified timeline sorted by createdAt
  const feed: MediaNode[] = [
    ...artworks.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      imageUrl: a.imageUrl,
      type: 'artwork' as const,
      aspectRatio: a.aspectRatio,
      createdAt: a.createdAt,
      author: a.author,
      likesCount: a.likes.length,
      isLikedByMe: authUser ? a.likes.some(l => l.userId === authUser.id) : false
    })),
    ...photoSeries.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      imageUrl: p.coverImage,
      type: 'photo-series' as const,
      aspectRatio: 'aspect-[4/5]',
      createdAt: p.createdAt,
      author: p.author,
      likesCount: p.likes.length,
      isLikedByMe: authUser ? p.likes.some(l => l.userId === authUser.id) : false
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <div className="flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto w-full">
      <div className="text-center mb-24 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
          Public <br/><span className="text-muted-foreground italic font-light">Archive</span>
        </h1>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground/80 font-bold border-y border-border/50 py-6 mb-8">
          The curated visual network.
        </p>
      </div>

      <div className="w-full border-t border-border/50 pt-24 mb-32 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-8 bg-background font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
          Live Feed
        </div>

        {feed.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl">
            <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">Network Empty. Awaiting Deployments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-[450px]">
             {feed.map((item) => (
                <div key={item.id} className="group relative flex flex-col h-full pointer-events-auto">
                  <ArtworkCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    aspectRatio={item.aspectRatio || 'aspect-square'}
                    className="h-[85%] flex-shrink-0"
                    likesCount={item.likesCount}
                    isLikedByMe={item.isLikedByMe}
                  />
                  {/* Author Attribution Layer */}
                  <Link href={`/${item.author.username}`} className="mt-4 flex items-center gap-3 group-hover:bg-card/50 p-3 rounded-xl transition-colors border border-transparent group-hover:border-border/50">
                    <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center overflow-hidden flex-shrink-0 border border-border/50 shadow-inner">
                      {item.author.avatarUrl ? (
                        <img src={item.author.avatarUrl} alt={item.author.username} className="w-full h-full object-cover" />
                      ) : (
                         <span className="text-[10px] text-background">{item.author.username.substring(0,2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <p className="font-serif font-bold text-sm text-foreground truncate">{item.title}</p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground truncate transition-colors group-hover:text-foreground">
                        {item.type === 'photo-series' && <Camera size={10} className="inline mr-1 -mt-[1px]" />}
                        Deployed by @{item.author.username}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
