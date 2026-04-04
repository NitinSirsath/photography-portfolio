import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, MapPin, Calendar, Info } from 'lucide-react'
import { useEffect } from 'react'

interface Photo {
  id: number
  color: string
  aspect: string
  title: string
  location: string
  date: string
  exif: string
}

interface PhotoModalProps {
  photo: Photo | null
  onClose: () => void
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [photo])

  return (
    <AnimatePresence>
      {photo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-card border border-border rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/50 hover:bg-background text-foreground rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="flex-1 bg-muted flex items-center justify-center min-h-[300px] md:min-h-0">
              <div className={`w-full h-full ${photo.color} opacity-40`} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="mono-label text-2xl opacity-20">IMAGE_RENDER_0x{photo.id}</span>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="w-full md:w-80 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border bg-card">
              <div className="space-y-8">
                <div>
                  <span className="mono-label text-monokai-pink mb-2 block">/ Project Title</span>
                  <h2 className="text-2xl font-bold">{photo.title}</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={16} className="text-monokai-orange" />
                    <span className="text-sm font-mono">{photo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar size={16} className="text-monokai-yellow" />
                    <span className="text-sm font-mono">{photo.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Camera size={16} className="text-monokai-green" />
                    <span className="text-sm font-mono">{photo.exif}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={14} className="text-monokai-blue" />
                  <span className="mono-label">Technical Metadata</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase mb-1">ISO</span>
                    <span className="text-sm font-mono">100</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase mb-1">Shutter</span>
                    <span className="text-sm font-mono">1/250s</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase mb-1">Aperture</span>
                    <span className="text-sm font-mono">f/2.8</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase mb-1">Focal</span>
                    <span className="text-sm font-mono">35mm</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
