'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-24 left-4 z-40 p-2 bg-card border border-border/50 rounded"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/80 z-40" 
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-background border-r border-border/50 p-8 transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} pt-32 md:pt-8 overflow-y-auto`}>
        <button onClick={() => setIsOpen(false)} className="md:hidden absolute top-8 right-8">
          <X size={24} />
        </button>

        <Link href="/dashboard" className="font-serif text-2xl font-bold mb-12 uppercase tracking-widest text-muted-foreground block hover:text-foreground transition-colors">
          Creator<br/>Studio
        </Link>
        <nav className="space-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <div className="text-foreground border-b border-border/50 pb-2 mb-8">Management</div>
          <Link href="/dashboard/content" className="block hover:text-foreground transition-colors">My Content</Link>
          <Link href="/dashboard/analytics" className="block hover:text-foreground transition-colors">Analytics & Stats</Link>
          <Link href="/dashboard/activity" className="block hover:text-foreground transition-colors">Network Activity</Link>
          
          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Artworks</div>
          <Link href="/artworks" className="block hover:text-foreground transition-colors">View Live Grid</Link>
          <Link href="/dashboard/artworks/new" className="block hover:text-foreground transition-colors">Deploy Artwork</Link>
          
          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Photo Series</div>
          <Link href="/photos" className="block hover:text-foreground transition-colors">View Archive</Link>
          <Link href="/dashboard/photos/new" className="block hover:text-foreground transition-colors">Deploy Series</Link>

          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Configurations</div>
          <Link href="/dashboard/settings" className="block text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2">
            Identity Core
          </Link>
        </nav>
      </aside>
    </>
  )
}
