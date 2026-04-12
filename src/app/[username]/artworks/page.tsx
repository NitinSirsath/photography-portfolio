import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ArtworkCard } from "@/components/ui/ArtworkCard"

export default async function PortfolioArtworksPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      artworks: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) notFound()

  const profileConfig = user.profileConfig as { accentColor?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" 

  return (
    <div className="min-h-screen bg-background" style={{ '--accent': accentColor } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="font-serif text-5xl font-black mb-16 text-center" style={{ color: 'var(--accent)' }}>Artworks</h1>
        {user.artworks.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-border/50 rounded-3xl mx-4">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground font-bold">No artworks deployed.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
            {user.artworks.map((artwork: any) => (
              <div key={artwork.id} className="break-inside-avoid">
                <ArtworkCard
                  id={artwork.id}
                  title={artwork.title}
                  description={artwork.description}
                  imageUrl={artwork.imageUrl}
                  aspectRatio="aspect-square"
                  className="w-full h-auto shadow-2xl rounded-2xl border border-transparent hover:border-foreground/20 transition-colors"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
