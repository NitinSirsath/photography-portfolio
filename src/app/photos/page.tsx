"use client"

import { motion } from 'framer-motion'
import { PhotoCard, type PhotoSeries } from '@/components/ui/PhotoCard'

const DUMMY_PHOTOS: PhotoSeries[] = [
  { id: 1, title: 'Andalusia, Spain', desc: "SEVILLE'S PLAZAS, RONDA'S GORGE AND GRANADA'S ARCHITECTURE", count: 27 },
  { id: 2, title: 'Coast of Brittany', desc: 'RUGGED COASTLINES AND CELTIC HERITAGE', count: 18 },
  { id: 3, title: 'Winter in Amsterdam', desc: 'SNOW TRANSFORMS THE CITY INTO MONOCHROME', count: 32 },
  { id: 4, title: 'Tokyo, Japan', desc: 'NEON LIGHTS, ALLEYWAYS, AND DENSE POPULATIONS', count: 45 },
  { id: 5, title: 'Isle of Skye', desc: 'LUSH GREEN VALLEYS COVERED IN MIST', count: 21 },
  { id: 6, title: 'Neo Faliro', desc: 'DECAYING BOATS AT THE SHORE', count: 14 },
  { id: 7, title: 'The Carriers', desc: 'A PHOTO SERIES ABOUT MAJESTIC WINTER MACHINES', count: 19 },
  { id: 8, title: 'Environmental Operation', desc: 'A PHOTO SERIES EXPLORING TRANSFORMATION', count: 24 },
  { id: 9, title: 'Parco Dei Mostri', desc: 'THE 16TH CENTURY GARDEN OF BOMARZO', count: 16 },
]

export default function PhotosComponent() {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 text-center bg-background px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-[4rem] md:text-[6.5rem] leading-none mb-4 text-foreground font-black tracking-tight">
          Photos
        </h1>
        <p className="text-[9px] md:text-[11px] tracking-[0.2em] font-bold uppercase text-muted-foreground mb-24">
          A selection of photo series shot in the moment.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_PHOTOS.map((photo, idx) => (
          <PhotoCard key={photo.id} photo={photo} idx={idx} />
        ))}
      </div>
    </div>
  )
}
