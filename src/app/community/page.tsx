import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Users } from 'lucide-react'

export const revalidate = 60

export default async function CommunityPage() {
  const creators = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { artworks: true, photoSeries: true, followers: true }
      }
    }
  })

  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background px-4 md:px-8">
      <div className="text-center mb-24 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
          Community
        </h1>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground/80 font-bold border-y border-border/50 py-6">
          Discover creators across the network.
        </p>
      </div>

      {creators.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl w-full max-w-4xl">
          <Users size={32} className="mx-auto mb-4 text-muted-foreground/50" />
          <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No creators have joined yet.</p>
        </div>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => {
            const totalWorks = creator._count.artworks + creator._count.photoSeries
            return (
              <Link
                key={creator.id}
                href={`/${creator.username}`}
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:shadow-2xl flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-foreground/10 border-2 border-border flex items-center justify-center overflow-hidden mb-6 group-hover:border-foreground/40 transition-colors">
                  {creator.avatarUrl ? (
                    <img src={creator.avatarUrl} alt={creator.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-serif text-3xl font-black text-muted-foreground group-hover:text-foreground transition-colors">
                      {creator.username.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Identity */}
                <h2 className="font-serif text-xl font-bold text-foreground mb-1">
                  {creator.displayName || creator.username}
                </h2>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-4">
                  @{creator.username}
                </p>

                {/* Bio snippet */}
                {creator.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                    {creator.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-auto pt-6 border-t border-border/50 w-full justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-foreground text-lg font-bold">{totalWorks}</span>
                    <span>Works</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-foreground text-lg font-bold">{creator._count.followers}</span>
                    <span>Followers</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
