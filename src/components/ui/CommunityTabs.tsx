'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArtworkCard } from '@/components/ui/ArtworkCard'
import { FollowButton } from '@/components/ui/FollowButton'
import { Tag } from 'lucide-react'

export function CommunityTabs({ posts, profiles, stats, isAuthenticated, currentUserId, popularTags = [] }: { posts: any[], profiles: any[], stats: any, isAuthenticated: boolean, currentUserId?: string, popularTags?: string[] }) {
  const [activeTab, setActiveTab] = useState<'posts' | 'profiles'>('posts')
  const [postFilter, setPostFilter] = useState<'all' | 'photos' | 'artworks'>('all')
  const [profileSort, setProfileSort] = useState<'rank' | 'newest'>('rank')
  const [postPage, setPostPage] = useState(1)
  const postsPerPage = 12

  const sortedProfiles = [...profiles].sort((a, b) => {
    if (profileSort === 'newest') return b.id.localeCompare(a.id) // simplistic
    return b.compositeScore - a.compositeScore
  })

  const filteredPosts = posts.filter(post => {
    if (postFilter === 'all') return true
    if (postFilter === 'photos') return post._type === 'photo-series'
    if (postFilter === 'artworks') return post._type === 'artwork'
    return true
  })

  const visiblePosts = filteredPosts.slice(0, postPage * postsPerPage)

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-12 border-y border-border/50 py-4">
        <span>{stats.creators} creators</span>
        <span>•</span>
        <span>{stats.works} works published</span>
        <span>•</span>
        <span>{stats.appreciations} appreciations</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 mb-12 border-b border-border/50">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-4 font-serif text-2xl font-bold transition-colors ${activeTab === 'posts' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('profiles')}
          className={`pb-4 font-serif text-2xl font-bold transition-colors ${activeTab === 'profiles' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Profiles
        </button>
      </div>

      {/* Popular Tags */}
      {popularTags.length > 0 && activeTab === 'posts' && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mr-2">Featured Tags:</span>
          {popularTags.map(tag => (
            <Link 
              key={tag} 
              href={`/tags/${tag.toLowerCase()}`}
              className="px-3 py-1 rounded-full border border-border/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors bg-card/30"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest mb-8">
            <button onClick={() => { setPostFilter('all'); setPostPage(1); }} className={`px-4 py-2 rounded-full border ${postFilter === 'all' ? 'bg-foreground text-background' : 'border-border/50 hover:bg-card'}`}>All</button>
            <button onClick={() => { setPostFilter('photos'); setPostPage(1); }} className={`px-4 py-2 rounded-full border ${postFilter === 'photos' ? 'bg-foreground text-background' : 'border-border/50 hover:bg-card'}`}>Photos</button>
            <button onClick={() => { setPostFilter('artworks'); setPostPage(1); }} className={`px-4 py-2 rounded-full border ${postFilter === 'artworks' ? 'bg-foreground text-background' : 'border-border/50 hover:bg-card'}`}>Artworks</button>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {visiblePosts.map(post => (
              <div key={post.id} className="break-inside-avoid relative group">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                    {post._type === 'artwork' ? 'ARTWORK' : 'PHOTO'}
                  </span>
                </div>
                <ArtworkCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  imageUrl={post._image}
                  aspectRatio={post.aspectRatio}
                  className="w-full h-auto shadow-xl rounded-2xl border border-transparent hover:border-foreground/20 transition-colors"
                />
                <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
                  <Link href={`/${post.author.username}/home`} className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
                    {post.author.avatarUrl ? (
                      <img src={post.author.avatarUrl} alt="" className="w-5 h-5 rounded-full" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-bold">
                        {post.author.username[0].toUpperCase()}
                      </span>
                    )}
                    <span className="text-[10px] font-bold tracking-widest uppercase">@{post.author.username}</span>
                  </Link>
                  <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold font-mono tracking-widest">★ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>

          {visiblePosts.length < filteredPosts.length && (
            <div className="pt-12 flex justify-center">
              <button 
                onClick={() => setPostPage(p => p + 1)}
                className="px-8 py-4 border border-border/50 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-card transition-colors font-bold"
              >
                Load More Archive Data
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profiles' && (
        <div className="space-y-8">
           <div className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest mb-8">
            <button onClick={() => setProfileSort('rank')} className={`px-4 py-2 rounded-full border ${profileSort === 'rank' ? 'bg-foreground text-background' : 'border-border/50 hover:bg-card'}`}>Ranked</button>
            <button onClick={() => setProfileSort('newest')} className={`px-4 py-2 rounded-full border ${profileSort === 'newest' ? 'bg-foreground text-background' : 'border-border/50 hover:bg-card'}`}>Recent</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProfiles.map(p => (
            <div key={p.id} className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              {p.isAvailableForHire && (
                <div className="absolute top-0 right-0 bg-green-500/20 text-green-500 text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-lg">
                  Available for Hire
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-border/50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   {p.avatarUrl ? (
                     <img src={p.avatarUrl} alt="" className="w-full h-full object-cover" />
                   ) : (
                     <span className="font-serif text-2xl font-bold opacity-50">{p.username[0].toUpperCase()}</span>
                   )}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">{p.displayName || p.username}</h3>
                  <Link href={`/${p.username}/home`} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                    @{p.username}
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {p.badges.map((b: string) => (
                  <span key={b} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                    {b}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/50 mt-2 text-center font-mono text-[10px] uppercase tracking-widest">
                <div>
                  <div className="text-sm font-bold text-foreground mb-1">{p.followers}</div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground mb-1">{p.works}</div>
                  <div className="text-muted-foreground">Works</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground mb-1">{p.appreciations}</div>
                  <div className="text-muted-foreground">Likes</div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                {currentUserId !== p.id ? (
                  <FollowButton 
                    targetUserId={p.id}
                    initialIsFollowing={p.isFollowedByMe}
                    initialCount={p.followers}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <button disabled className="flex-1 py-2 rounded border border-border/50 text-[10px] font-mono uppercase tracking-widest font-bold opacity-50 cursor-not-allowed">
                    You
                  </button>
                )}
                <Link href={`/${p.username}/home`} className="flex-1 py-2 rounded bg-foreground text-background text-[10px] font-mono uppercase tracking-widest font-bold text-center flex items-center justify-center">
                  Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  )
}
