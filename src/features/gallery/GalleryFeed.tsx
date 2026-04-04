import { useState } from 'react'
import { PhotoModal } from '@/components/ui/PhotoModal'

interface Photo {
  id: number
  color: string
  aspect: string
  title: string
  location: string
  date: string
  exif: string
}

const PHOTOS: Photo[] = [
  { 
    id: 1, 
    color: 'bg-monokai-pink', 
    aspect: 'aspect-square', 
    title: 'Neon Structures', 
    location: 'Shibuya, Tokyo', 
    date: '2024.03.12', 
    exif: 'Sony A7R IV · 35mm f/1.4' 
  },
  { 
    id: 2, 
    color: 'bg-monokai-orange', 
    aspect: 'aspect-video', 
    title: 'Void Architecture', 
    location: 'Berlin, DE', 
    date: '2024.01.05', 
    exif: 'Sony A7R IV · 85mm f/1.4' 
  },
  { 
    id: 3, 
    color: 'bg-monokai-yellow', 
    aspect: 'aspect-[3/4]', 
    title: 'Cyber Geometry', 
    location: 'Seoul, KR', 
    date: '2023.11.22', 
    exif: 'Sony A7R IV · 35mm f/1.4' 
  },
  { 
    id: 4, 
    color: 'bg-monokai-green', 
    aspect: 'aspect-square', 
    title: 'Binary Flora', 
    location: 'Singapore', 
    date: '2023.09.15', 
    exif: 'Sony A7R IV · 90mm Macro' 
  },
  { 
    id: 5, 
    color: 'bg-monokai-blue', 
    aspect: 'aspect-video', 
    title: 'The Blue Loop', 
    location: 'New York, USA', 
    date: '2023.07.01', 
    exif: 'Sony A7R IV · 35mm f/1.4' 
  },
  { 
    id: 6, 
    color: 'bg-monokai-purple', 
    aspect: 'aspect-[4/5]', 
    title: 'Static Horizon', 
    location: 'Iceland', 
    date: '2023.05.10', 
    exif: 'Sony A7R IV · 24mm f/1.4' 
  },
]

export function GalleryFeed() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {PHOTOS.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedPhoto(photo)}
            className={`relative group overflow-hidden cursor-zoom-in ${photo.aspect} bg-muted grayscale hover:grayscale-0 transition-all duration-500`}
          >
            <div className={`absolute inset-0 ${photo.color} opacity-20 group-hover:opacity-0 transition-opacity`} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="mono-label border border-white/20 px-3 py-1 bg-black/60">view_file</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="mono-label bg-background/80 px-2 py-1">IMAGE_{photo.id.toString().padStart(3, '0')}</span>
            </div>
          </div>
        ))}
      </div>

      <PhotoModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </>
  )
}
