import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ArtworkCard } from "@/components/ui/ArtworkCard"
import { FollowButton } from "@/components/ui/FollowButton"
import { ShareButton } from "@/components/ui/ShareButton"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Coins } from "lucide-react"
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return {}

  const profileConfig = user.profileConfig as { headerImage?: string } | null

  return {
    title: `${user.displayName || user.username} — Visual Portfolio`,
    description: user.bio || `View the visual portfolio of ${user.displayName || user.username}.`,
    openGraph: {
      images: profileConfig?.headerImage || user.avatarUrl ? [profileConfig?.headerImage || user.avatarUrl!] : [],
    }
  }
}

export default async function PortfolioHomePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      artworks: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 3
      },
      photoSeries: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 3
      },
      _count: {
        select: { followers: true }
      }
    }
  })

  if (!user) notFound()

  // Check if visitor is following
  let isFollowing = false
  let isAuthenticated = false
  if (authUser) {
    isAuthenticated = true
    const currentDbUser = await prisma.user.findUnique({ where: { id: authUser.id } })
    if (currentDbUser) {
      const follow = await prisma.follows.findUnique({
        where: { followerId_followingId: { followerId: currentDbUser.id, followingId: user.id } }
      })
      isFollowing = !!follow
    }
  }

  // Fire-and-forget view increment
  try {
    prisma.user.update({
      where: { id: user.id },
      data: { portfolioViews: { increment: 1 } }
    }).catch(() => {})
  } catch (err) {}

  const profileConfig = user.profileConfig as { accentColor?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" 

  const isOwner = authUser?.id === user.id

  const works = [
    ...user.artworks.map((a: any) => ({ ...a, _type: 'artwork', _image: a.imageUrl })),
    ...user.photoSeries.map((p: any) => ({ ...p, _type: 'photo-series', _image: p.coverImage, aspectRatio: 'aspect-[4/5]' })),
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6)

  return (
    <div className="min-h-screen bg-background" style={{ '--accent': accentColor } as React.CSSProperties}>
      <div className="pt-32 pb-16 px-8 max-w-7xl mx-auto border-b border-border/50">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="w-40 h-40 rounded-full border-4 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xl relative group" style={{ borderColor: 'var(--accent)' }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName || user.username} className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif text-5xl font-black text-muted-foreground">
                {user.username.substring(0,2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="font-serif text-5xl md:text-7xl font-black text-foreground tracking-tighter">
                {user.displayName || user.username}
              </h1>
              {user.isAvailableForHire && (
                <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest self-start mt-2">
                  Available for Hire
                </span>
              )}
            </div>
            {user.bio ? (
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
                {user.bio}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-muted-foreground font-light italic opacity-50 mb-8">
                Visual artist and architectural observer.
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-4">
              {!isOwner && (
                <FollowButton 
                  targetUserId={user.id} 
                  initialIsFollowing={isFollowing} 
                  initialCount={user._count.followers}
                  isAuthenticated={isAuthenticated}
                />
              )}
              {/* @ts-ignore - Assuming URL exists on request in actual prod, or hardcode origin */}
              <ShareButton title={`${user.displayName || user.username}'s Portfolio`} url={`https://yourdomain.com/${user.username}/home`} />
              {user.tipJarUrl && (
                <a 
                  href={user.tipJarUrl} 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full font-bold text-xs hover:bg-amber-500/20 transition-colors"
                >
                  <Coins size={14} /> Support
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-24">
        {works.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-border/50 rounded-3xl mx-4">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground font-bold">No assets deployed.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
             {works.map((item: any) => (
                <div key={item.id} className="break-inside-avoid">
                  <ArtworkCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item._image}
                    aspectRatio={item.aspectRatio || 'aspect-square'}
                    className="w-full h-auto shadow-2xl rounded-2xl border border-transparent hover:border-foreground/20 transition-colors"
                  />
                </div>
              ))}
          </div>
        )}
        <div className="mt-16 flex items-center justify-center gap-4">
          <Link href={`/${username}/photos`} className="px-6 py-3 border border-border/50 rounded-full hover:bg-card transition">
            View All Photos
          </Link>
          <Link href={`/${username}/artworks`} className="px-6 py-3 border border-border/50 rounded-full hover:bg-card transition">
            View All Artworks
          </Link>
        </div>
      </main>
    </div>
  )
}
