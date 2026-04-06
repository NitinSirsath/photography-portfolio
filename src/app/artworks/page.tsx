import prisma from '@/lib/prisma'
import { ArtworkCard } from '@/components/ui/ArtworkCard'
import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const revalidate = 60

export default async function ArtworksPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
  )
  const { data: { user: authUser } } = await supabase.auth.getUser()

  const artworks = await prisma.artwork.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { username: true, avatarUrl: true, displayName: true } },
      likes: true
    }
  })

  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background px-4 md:px-8">
      <div className="text-center mb-24 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
          Artworks
        </h1>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground/80 font-bold border-y border-border/50 py-6">
          Generative code art and visual experiments from the collective.
        </p>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl w-full max-w-4xl">
          <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No artworks deployed yet.</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-[450px]">
          {artworks.map((art, idx) => {
            const likesCount = art.likes.length
            const isLikedByMe = authUser ? art.likes.some((l: any) => l.userId === authUser.id) : false

            return (
              <div key={art.id} className="group relative flex flex-col h-full">
                <ArtworkCard
                  id={art.id}
                  title={art.title}
                  description={art.description}
                  imageUrl={art.imageUrl}
                  aspectRatio={art.aspectRatio}
                  className="h-[85%] flex-shrink-0"
                  tags={art.tags}
                  idx={idx}
                  likesCount={likesCount}
                  isLikedByMe={isLikedByMe}
                />
                <Link href={`/${art.author.username}`} className="mt-4 flex items-center gap-3 p-3 rounded-xl transition-colors border border-transparent hover:border-border/50 hover:bg-card/50">
                  <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center overflow-hidden flex-shrink-0">
                    {art.author.avatarUrl ? (
                      <img src={art.author.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[9px] text-background">{art.author.username.substring(0,2).toUpperCase()}</span>
                    )}
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    @{art.author.username}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
