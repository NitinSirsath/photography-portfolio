"use client"

import { motion } from 'framer-motion'
import { ArtworkCard } from './ArtworkCard'
import type { Artwork } from '@prisma/client'

export function ArtworksGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 text-center bg-background px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-[4rem] md:text-[6.5rem] leading-none mb-4 text-foreground font-black tracking-tight">
          Artworks
        </h1>
        <p className="text-[9px] md:text-[11px] tracking-[0.2em] font-bold uppercase text-muted-foreground mb-24">
          Selected 100% code-based algorithmic art.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
        {artworks.map((art, idx) => (
          <ArtworkCard 
            key={art.id} 
            id={art.id}
            title={art.title}
            description={art.description}
            imageUrl={art.imageUrl}
            aspectRatio={art.aspectRatio}
            className={art.colSpan}
            tags={art.tags}
            idx={idx} 
          />
        ))}
      </div>
    </div>
  )
}
