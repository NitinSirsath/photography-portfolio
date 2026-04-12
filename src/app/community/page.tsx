import prisma from '@/lib/prisma'
import { CommunityTabs } from '@/components/ui/CommunityTabs'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Community — Visual Archive",
  description: "Discover creators and artworks across the Visual Archive network.",
}

export const revalidate = 60

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  let currentDbUser = null
  if (authUser) {
    currentDbUser = await prisma.user.findUnique({ where: { id: authUser.id } })
  }
  const creatorsCount = await prisma.user.count()
  const worksCount = await prisma.artwork.count({ where: { isPublished: true } }) + await prisma.photoSeries.count({ where: { isPublished: true } })
  const appreciationsCount = await prisma.like.count()

  const allArtworks = await prisma.artwork.findMany({
    where: { isPublished: true },
    include: { author: true, _count: { select: { likes: true } } }
  })
  
  const allSeries = await prisma.photoSeries.findMany({
    where: { isPublished: true },
    include: { author: true, _count: { select: { likes: true } } }
  })

  const posts = [
    ...allArtworks.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      _type: 'artwork',
      _image: a.imageUrl,
      aspectRatio: a.aspectRatio,
      createdAt: a.createdAt,
      author: a.author,
      likes: a._count.likes
    })),
    ...allSeries.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      _type: 'photo-series',
      _image: s.coverImage,
      aspectRatio: 'aspect-[4/5]',
      createdAt: s.createdAt,
      author: s.author,
      likes: s._count.likes
    }))
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const users = await prisma.user.findMany({
    include: {
      artworks: { where: { isPublished: true }, include: { _count: { select: { likes: true } } } },
      photoSeries: { where: { isPublished: true }, include: { _count: { select: { likes: true } } } },
      _count: { select: { followers: true } },
      followers: currentDbUser ? {
        where: { followerId: currentDbUser.id }
      } : false
    }
  })

  const oneMonthAgo = new Date()
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)

  let profiles = users.map(user => {
    const worksCount = user.artworks.length + user.photoSeries.length
    const likesCount = 
      user.artworks.reduce((sum, a) => sum + a._count.likes, 0) + 
      user.photoSeries.reduce((sum, s) => sum + s._count.likes, 0)
    
    const compositeScore = user._count.followers + likesCount + (worksCount * 10)
    
    const badges: string[] = []
    if (user.createdAt > oneMonthAgo && worksCount >= 3) badges.push('Rising Star')
    if (worksCount >= 20) badges.push('Prolific')
    if (likesCount >= 50) badges.push('Well Loved')

    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      isAvailableForHire: user.isAvailableForHire,
      works: worksCount,
      followers: user._count.followers,
      appreciations: likesCount,
      compositeScore,
      badges,
      isFollowedByMe: user.followers?.length > 0
    }
  }).filter(p => p.works > 0)

  // Rank and add Top Creator badge
  profiles.sort((a, b) => b.compositeScore - a.compositeScore)
  const top10PercentIndex = Math.max(1, Math.floor(profiles.length * 0.1))
  profiles.forEach((p, idx) => {
    if (idx < top10PercentIndex) {
      p.badges.push('Top Creator')
    }
  })

  // Get Popular Tags
  const artworksWithTags = await prisma.artwork.findMany({
    where: { isPublished: true },
    select: { tags: true }
  })
  
  const tagCounts: Record<string, number> = {}
  artworksWithTags.forEach(a => {
    a.tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1
    })
  })
  
  const popularTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag)

  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background">
      <CommunityTabs 
        posts={posts} 
        profiles={profiles} 
        stats={{ creators: creatorsCount, works: worksCount, appreciations: appreciationsCount }}
        isAuthenticated={!!authUser}
        currentUserId={currentDbUser?.id}
        popularTags={popularTags}
      />
    </div>
  )
}
