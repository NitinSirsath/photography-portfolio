import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ArtworkCard } from "@/components/ui/ArtworkCard"
import { User, MapPin, Link as LinkIcon, Calendar } from "lucide-react"
import Link from "next/link"

// Define param inference for Next.js App Router (Async Params in Next.js 15+)
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  // 1. Resolve Identity and Fetch Entire Profile Sub-Graph
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      artworks: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
      },
      photoSeries: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: { followers: true, following: true, artworks: true }
      }
    }
  })

  // 2. Terminate gracefully if Identity is Invalid
  if (!user) {
    notFound()
  }

  // 3. Extract aesthetic JSON configuration (Fallbacks to global theme)
  const profileConfig = user.profileConfig as { accentColor?: string, layout?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" // Monokai Green Fallback

  return (
    <div className="min-h-screen bg-background pt-24 px-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
      
      {/* ------------------------------------------- */}
      {/* LEFT COLUMN: STATIC IDENTITY PANEL */}
      {/* ------------------------------------------- */}
      <aside className="w-full md:w-80 flex-shrink-0 relative">
        <div className="sticky top-32 space-y-8">
          
          {/* Avatar Core */}
          <div className="w-32 h-32 rounded-3xl bg-card border-2 flex items-center justify-center overflow-hidden relative shadow-2xl transition-all" style={{ borderColor: accentColor }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName || user.username} className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {user.displayName || user.username}
            </h1>
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mt-2 flex items-center gap-2">
              @{user.username}
            </p>
          </div>

          <div className="flex gap-6 border-y border-border/50 py-6">
            <div>
              <p className="font-mono text-xl font-bold" style={{ color: accentColor }}>{user._count.followers}</p>
              <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold" style={{ color: accentColor }}>{user._count.following}</p>
              <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold" style={{ color: accentColor }}>{user._count.artworks}</p>
              <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Deployments</p>
            </div>
          </div>

          {user.bio && (
            <p className="text-sm text-foreground/80 leading-relaxed max-w-sm">
              {user.bio}
            </p>
          )}

          <div className="space-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-3">
              <Calendar size={14} /> Joined {user.createdAt.getFullYear()}
            </div>
            <div className="flex items-center gap-3">
              <LinkIcon size={14} /> <span className="hover:text-foreground cursor-pointer transition-colors">monokai.io/</span>
            </div>
          </div>
          
          <button 
            className="w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold text-background transition-all hover:scale-[0.98]" 
            style={{ backgroundColor: accentColor }}
          >
            Initiate Link
          </button>
        </div>
      </aside>

      {/* ------------------------------------------- */}
      {/* RIGHT COLUMN: DYNAMIC MEDIA GRID */}
      {/* ------------------------------------------- */}
      <main className="flex-1 pb-32">
        <div className="mb-12 flex gap-8 border-b border-border/50 pb-4 font-mono text-xs uppercase tracking-widest font-bold">
          <button style={{ color: accentColor }} className="relative">
            Artworks
            <span className="absolute -bottom-[17px] left-0 right-0 h-[2px]" style={{ backgroundColor: accentColor }}></span>
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            Journals
          </button>
        </div>

        {user.artworks.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-border/50 rounded-3xl">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">No Media Deployed</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-[400px]">
             {user.artworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  description={artwork.description}
                  imageUrl={artwork.imageUrl}
                  aspectRatio={artwork.aspectRatio}
                  className={artwork.colSpan}
                />
              ))}
          </div>
        )}
      </main>

    </div>
  )
}
