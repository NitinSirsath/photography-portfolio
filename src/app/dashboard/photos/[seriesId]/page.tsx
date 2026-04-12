import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SeriesPhotosPage({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const series = await prisma.photoSeries.findUnique({
    where: { id: seriesId },
    include: { photos: { orderBy: { createdAt: 'desc' } } }
  })

  if (!series || series.userId !== user.id) redirect('/dashboard/content')

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-8">
        <div>
          <Link href="/dashboard/content" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">← Back to Content</Link>
          <h1 className="font-serif text-4xl font-bold mb-2">{series.title}</h1>
          <p className="text-muted-foreground">{series.photos.length} photos deployed</p>
        </div>
        <Link href={`/dashboard/photos/${seriesId}/upload`} className="px-6 py-3 bg-foreground text-background font-bold rounded hover:opacity-90">
          Add Photo
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {series.photos.map(p => (
          <div key={p.id} className="bg-card border border-border/50 rounded-xl overflow-hidden group relative aspect-square">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.url})` }} />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {p.focalLength && <div>{p.focalLength}</div>}
              {p.aperture && <div>{p.aperture}</div>}
              {p.shutterSpeed && <div>{p.shutterSpeed}</div>}
              {p.iso && <div>ISO {p.iso}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
