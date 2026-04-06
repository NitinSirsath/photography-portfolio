import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ArtworkCard } from "@/components/ui/ArtworkCard"
import { Link as LinkIcon, MapPin } from "lucide-react"

export default async function PortfolioArchivePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  // 1. Resolve Identity and Fetch Portfolio Graph
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
      }
    }
  })

  if (!user) notFound()

  // 2. Extract Professional Aesthetic JSON
  const profileConfig = user.profileConfig as { accentColor?: string, headerImage?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" 

  const totalDeployments = user.artworks.length + user.photoSeries.length

  return (
    <div className="min-h-screen bg-background">
      
      {/* ------------------------------------------- */}
      {/* 1. PROFESSIONAL HEADER MATTE */}
      {/* ------------------------------------------- */}
      <div className="pt-32 pb-16 px-8 max-w-7xl mx-auto border-b border-border/50">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          
          <div className="w-40 h-40 rounded-full border-4 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xl relative group" style={{ borderColor: accentColor }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName || user.username} className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif text-5xl font-black text-muted-foreground">
                {user.username.substring(0,2).toUpperCase()}
              </span>
            )}
            <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div className="flex-1 max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tighter">
              {user.displayName || user.username}
            </h1>
            
            {user.bio ? (
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
                {user.bio}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-muted-foreground font-light italic opacity-50 mb-8">
                Visual artist and architectural observer.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 font-mono text-[10px] uppercase tracking-widest font-bold">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Monokai ID</span>
                <span style={{ color: accentColor }}>@{user.username}</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-border/50 pl-8">
                <span className="text-muted-foreground">Visual Asset Cache</span>
                <span className="text-foreground">{totalDeployments} Elements</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-border/50 pl-8">
                <span className="text-muted-foreground">Network Link</span>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors mix-blend-difference">
                   <LinkIcon size={12} /> Contact Node
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* 2. THE VISUAL MASONRY ARCHIVE */}
      {/* ------------------------------------------- */}
      <main className="max-w-7xl mx-auto px-4 py-24">
        
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-16 px-4">
           <span>Displaying Primary Archive</span>
           <span className="flex items-center gap-4">
             <span className="hidden sm:inline">Sorting Alg: Chronological</span>
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
           </span>
        </div>

        {totalDeployments === 0 ? (
          <div className="text-center py-40 border border-dashed border-border/50 rounded-3xl mx-4">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground font-bold">Terminal Empty. Identity has no deployed assets.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
             {user.artworks.map((artwork) => (
                <div key={artwork.id} className="break-inside-avoid">
                  <ArtworkCard
                    id={artwork.id}
                    title={artwork.title}
                    description={artwork.description}
                    imageUrl={artwork.imageUrl}
                    aspectRatio={artwork.aspectRatio}
                    className="w-full h-auto shadow-2xl rounded-2xl border border-transparent hover:border-foreground/20 transition-colors"
                  />
                </div>
              ))}
              
              {/* Note: Photo Series would be interleaved here using a merged array sorted by createdAt */}
          </div>
        )}

      </main>
      
    </div>
  )
}
