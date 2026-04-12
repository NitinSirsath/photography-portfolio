import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Camera } from "lucide-react"

export default async function PortfolioPhotosPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      photoSeries: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { photos: true, likes: true }
          }
        }
      }
    }
  })

  if (!user) notFound()

  const profileConfig = user.profileConfig as { accentColor?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" 

  return (
    <div className="min-h-screen bg-background" style={{ '--accent': accentColor } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="font-serif text-5xl font-black mb-16 text-center" style={{ color: 'var(--accent)' }}>Photo Journals</h1>
        {user.photoSeries.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl w-full max-w-4xl mx-auto">
            <Camera size={32} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No journals deployed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.photoSeries.map((series) => (
              <Link 
                key={series.id} 
                href={`/${username}/photos/${series.id}`} 
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/50 aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-foreground/20"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${series.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start text-white">
                  <h2 className="font-serif text-2xl font-bold mb-2 text-white/90 group-hover:text-white transition-colors">
                    {series.title}
                  </h2>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mb-4 line-clamp-2">
                    {series.description}
                  </p>
                  <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/50">
                    <span>{series._count.photos} photos</span>
                    <span>★ {series._count.likes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
