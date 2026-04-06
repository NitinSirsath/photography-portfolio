import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Camera } from 'lucide-react'

export const revalidate = 60

export default async function PhotosArchive() {
  const allSeries = await prisma.photoSeries.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { username: true, avatarUrl: true, displayName: true }
      },
      _count: {
        select: { photos: true, likes: true }
      }
    }
  })

  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background px-4 md:px-8">
      <div className="text-center mb-24 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
          Photo <br/><span className="text-muted-foreground italic font-light">Journals</span>
        </h1>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground/80 font-bold border-y border-border/50 py-6">
          Curated series from the collective archive.
        </p>
      </div>

      {allSeries.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl w-full max-w-4xl">
          <Camera size={32} className="mx-auto mb-4 text-muted-foreground/50" />
          <p className="font-mono uppercase tracking-widest text-muted-foreground text-sm font-bold">No journals deployed yet.</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSeries.map((series, idx) => (
            <Link 
              key={series.id} 
              href={`/${series.author.username}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/50 aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-foreground/20"
            >
              {/* Cover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${series.coverImage})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Meta Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start text-white">
                <h2 className="font-serif text-2xl font-bold mb-2 text-white/90 group-hover:text-white transition-colors">
                  {series.title}
                </h2>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mb-4 line-clamp-2">
                  {series.description}
                </p>

                <div className="flex items-center justify-between w-full">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      {series.author.avatarUrl ? (
                        <img src={series.author.avatarUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[8px] text-white">{series.author.username.substring(0,2).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/70">@{series.author.username}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/50">
                    <span>{series._count.photos} photos</span>
                    <span>★ {series._count.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
