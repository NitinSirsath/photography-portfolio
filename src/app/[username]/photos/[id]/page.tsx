import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { ArrowLeft, Camera, Maximize2 } from "lucide-react"

export default async function PhotoSeriesDetailPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>
}) {
  const { username, id } = await params

  const series = await prisma.photoSeries.findUnique({
    where: { id },
    include: {
      author: { select: { username: true, displayName: true } },
      photos: { orderBy: { createdAt: 'asc' } }
    }
  })

  if (!series || series.author.username !== username) notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 px-8 max-w-7xl mx-auto">
        <Link 
          href={`/${username}/photos`} 
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Journals
        </Link>
      </div>

      <header className="max-w-7xl mx-auto px-4 md:px-8 mb-24 text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tighter mb-6">{series.title}</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">{series.description}</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {series.photos.map((photo) => (
            <div key={photo.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-border/20 bg-card">
               <img src={photo.url} alt="" className="w-full h-auto block" />
               
               {/* Technical Metadata Overlay */}
               <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                 <div className="flex items-center gap-4 mb-4">
                    <Camera size={20} className="text-white/40" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Exposure Parameters</span>
                 </div>
                 <div className="grid grid-cols-2 gap-y-4 font-mono text-[11px] uppercase tracking-widest border-t border-white/10 pt-4">
                    <div className="flex flex-col gap-1">
                       <span className="text-white/40 text-[9px]">Aperture</span>
                       <span>{photo.aperture || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-white/40 text-[9px]">Shutter</span>
                       <span>{photo.shutterSpeed || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-white/40 text-[9px]">Focal</span>
                       <span>{photo.focalLength || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-white/40 text-[9px]">ISO</span>
                       <span>{photo.iso || '—'}</span>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
