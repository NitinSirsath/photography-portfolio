import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { createClient } from '@/lib/supabase/server'
import { AppreciationModule } from "@/components/ui/AppreciationModule"
import { CommentThread } from "@/components/ui/CommentThread"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ username: string, id: string }> }): Promise<Metadata> {
  const { id } = await params
  const artwork = await prisma.artwork.findUnique({ where: { id } })
  if (!artwork) return {}

  return {
    title: `${artwork.title} — Visual Archive`,
    description: artwork.description,
    openGraph: {
      images: [artwork.imageUrl],
    }
  }
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>
}) {
  const { username, id } = await params

  // 1. Verify the user exists
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) notFound()

  // 2. Fetch the artwork with all relations
  const artwork = await prisma.artwork.findUnique({
    where: { id },
    include: {
      author: { select: { username: true, displayName: true, avatarUrl: true } },
      likes: true,
      comments: {
        where: { parentId: null }, // Fetch only top-level comments
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { username: true, displayName: true, avatarUrl: true } },
          replies: {
            include: {
              user: { select: { username: true, displayName: true, avatarUrl: true } }
            },
            orderBy: { createdAt: 'asc' }
          }
        }
      }
    }
  })

  if (!artwork || artwork.author.username !== username) notFound()

  // 3. Get current session for interaction state
  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  const isLikedByMe = authUser ? artwork.likes.some(l => l.userId === authUser.id) : false

  // Serialize comments for client component
  const serializeComment = (c: any): any => ({
    id: c.id,
    text: c.text,
    createdAt: c.createdAt.toISOString(),
    user: c.user,
    replies: c.replies?.map(serializeComment) || []
  })

  const serializedComments = artwork.comments.map(serializeComment)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="pt-28 px-8 max-w-7xl mx-auto">
        <Link 
          href={`/${username}`} 
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to @{username}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Full-bleed Image */}
          <div className="flex-1 min-w-0">
            <div className="relative w-full rounded-2xl overflow-hidden border border-border/20 shadow-2xl bg-card">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right: Meta + Comments Panel */}
          <div className="w-full lg:w-96 flex-shrink-0 space-y-8">
            
            {/* Author */}
            <Link href={`/${username}`} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-foreground/20 transition-colors">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center overflow-hidden">
                {artwork.author.avatarUrl ? (
                  <img src={artwork.author.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-lg font-bold text-muted-foreground">
                    {artwork.author.username.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-serif font-bold text-foreground">{artwork.author.displayName || artwork.author.username}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">@{artwork.author.username}</p>
              </div>
            </Link>

            {/* Title + Description */}
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-3">{artwork.title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{artwork.description}</p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar size={12} />
                {artwork.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {/* Tags */}
            {artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/tags/${tag.toLowerCase()}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 text-[9px] font-mono uppercase tracking-widest text-muted-foreground bg-card hover:border-foreground/40 hover:text-foreground transition-colors"
                  >
                    <Tag size={10} /> {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Appreciation */}
            <div className="border-y border-border/50 py-6">
              <AppreciationModule
                targetId={artwork.id}
                type="artwork"
                initialCount={artwork.likes.length}
                isInitiallyAppreciated={isLikedByMe}
              />
            </div>

            {/* Comments */}
            <CommentThread
              targetId={artwork.id}
              type="artwork"
              comments={serializedComments}
              currentUserId={authUser?.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
