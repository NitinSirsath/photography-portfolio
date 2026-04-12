'use client'

import { useState } from 'react'
import { deleteArtworkAction } from '@/app/actions/artwork'
import { deletePhotoSeriesAction } from '@/app/actions/photo'
import { toast } from 'sonner'
import Link from 'next/link'

export function ContentList({ artworks, photoSeries }: { artworks: any[], photoSeries: any[] }) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDeleteArtwork = async (id: string) => {
    if (!confirm('Delete this artwork permanently?')) return
    setDeleting(id)
    const res = await deleteArtworkAction(id)
    if (res.success) {
      toast.success('Artwork deleted')
    } else {
      toast.error('Failed to delete artwork')
    }
    setDeleting(null)
  }

  const handleDeleteSeries = async (id: string) => {
    if (!confirm('Delete this photo series permanently?')) return
    setDeleting(id)
    const res = await deletePhotoSeriesAction(id)
    if (res.success) {
      toast.success('Series deleted')
    } else {
      toast.error('Failed to delete series')
    }
    setDeleting(null)
  }

  return (
    <div className="space-y-16">
      <section>
        <h2 className="font-serif text-2xl font-bold mb-6">Artworks</h2>
        {artworks.length === 0 ? (
          <p className="text-muted-foreground">No artworks deployed.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {artworks.map(a => (
              <div key={a.id} className="bg-card border border-border/50 rounded-xl overflow-hidden group">
                <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${a.imageUrl})` }} />
                <div className="p-4 flex flex-col justify-between h-32">
                  <div>
                    <h3 className="font-bold truncate" title={a.title}>{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${a.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {a.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <button 
                      onClick={() => handleDeleteArtwork(a.id)}
                      disabled={deleting === a.id}
                      className="text-xs text-red-500 hover:underline"
                    >
                      {deleting === a.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-6">Photo Series</h2>
        {photoSeries.length === 0 ? (
          <p className="text-muted-foreground">No photo series deployed.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {photoSeries.map(s => (
              <div key={s.id} className="bg-card border border-border/50 rounded-xl overflow-hidden group">
                <div className="aspect-[4/5] bg-cover bg-center relative" style={{ backgroundImage: `url(${s.coverImage})` }}>
                  <Link href={`/dashboard/photos/${s.id}`} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity">
                    Manage Photos
                  </Link>
                </div>
                <div className="p-4 flex flex-col justify-between h-32">
                  <div>
                    <h3 className="font-bold truncate" title={s.title}>{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${s.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {s.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <button 
                      onClick={() => handleDeleteSeries(s.id)}
                      disabled={deleting === s.id}
                      className="text-xs text-red-500 hover:underline"
                    >
                      {deleting === s.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
