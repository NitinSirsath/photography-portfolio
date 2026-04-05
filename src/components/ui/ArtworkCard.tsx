"use client"

import { motion } from 'framer-motion'
import type { Artwork } from '@prisma/client'

interface ArtworkCardProps {
  art: Artwork
  idx: number
}

export function ArtworkCard({ art, idx }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-card border border-border/50 flex ${art.colSpan} ${art.aspectRatio}`}
    >
      {/* Real Database Image Canvas */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${art.imageUrl})` }}
      />
      
      {/* Darken overlay specifically for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Hover cursor interaction point */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
          <div className="w-1.5 h-1.5 bg-white rounded-full mb-1"></div>
          <span className="text-[8px] font-bold tracking-widest text-white uppercase">View</span>
        </div>
      </div>

      {/* Synchronized Meta Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 flex flex-col items-start text-left text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="font-serif text-3xl font-bold mb-2 shadow-sm text-white/90 group-hover:text-white transition-colors">{art.title}</h2>
        <p className="text-[9px] uppercase tracking-widest font-bold text-white/70 mb-3 line-clamp-1">
          {art.description}
        </p>
        {art.tags && art.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {art.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full border border-white/20 text-[8px] tracking-widest uppercase text-white/80 bg-black/40">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
