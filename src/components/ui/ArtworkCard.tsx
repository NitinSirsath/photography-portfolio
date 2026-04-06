"use client"

import { motion } from 'framer-motion'
import { AppreciationModule } from '@/components/ui/AppreciationModule'
import Link from 'next/link'

function LinkOrDiv({ href, className, children }: { href?: string, className?: string, children: React.ReactNode }) {
  if (href) return <Link href={href} className={className}>{children}</Link>
  return <div className={className}>{children}</div>
}

interface ArtworkCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  aspectRatio: string
  className?: string
  tags?: string[]
  idx?: number
  authorUsername?: string
  // Optional engagement props
  likesCount?: number
  isLikedByMe?: boolean
}

export function ArtworkCard({ 
  id, title, description, imageUrl, aspectRatio, className = "", tags = [], idx = 0,
  authorUsername, likesCount = 0, isLikedByMe = false 
}: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`relative group overflow-hidden cursor-pointer bg-card flex flex-col ${aspectRatio} ${className}`}
    >
      {/* 1. Main Visual Asset */}
      <LinkOrDiv href={authorUsername ? `/${authorUsername}/artworks/${id}` : undefined} className="relative w-full h-full rounded-2xl overflow-hidden border border-border/10 shadow-lg group-hover:shadow-2xl transition-all duration-700 block">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </LinkOrDiv>
      
      {/* 2. Professional Meta Layer (Below Image) */}
      <div className="mt-4 flex items-start justify-between gap-4 px-2">
        <div className="flex-1">
          <h2 className="font-serif text-lg font-bold text-foreground leading-tight">{title}</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1 line-clamp-1">
            {description}
          </p>
        </div>

        {/* Appreciation Subsystem */}
        <div className="flex-shrink-0 relative z-10">
          <AppreciationModule 
            targetId={id} 
            type="artwork" 
            initialCount={likesCount} 
            isInitiallyAppreciated={isLikedByMe} 
          />
        </div>
      </div>
    </motion.div>
  )
}
