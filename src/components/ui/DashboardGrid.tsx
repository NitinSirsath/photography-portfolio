"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PlusSquare, Type, Camera, Settings, Database, LogOut, User as UserIcon } from 'lucide-react'
import type { User } from '@prisma/client'
import { signOutAction } from '@/app/actions/auth'

export function DashboardGrid({ user }: { user: User }) {
  return (
    <div className="p-8 pt-24 md:pt-32 max-w-6xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-border/50 pb-8 gap-8">
        <div>
          <h1 className="font-serif text-4xl lg:text-6xl font-black tracking-tight mb-4 text-foreground">Creator Studio</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-2 text-green-500"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM ONLINE</span> 
            <span>•</span> 
            <span>POSTGRESQL SYNCHRONIZED</span>
          </p>
        </div>

        {/* User Identity Panel */}
        <div className="flex flex-col items-end gap-3 text-right">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-mono text-xs font-bold uppercase tracking-widest">{user.username}</div>
              <div className="text-[10px] text-muted-foreground">{user.email}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
              <UserIcon size={20} />
            </div>
          </div>
          <form action={signOutAction}>
             <button type="submit" className="text-[9px] uppercase tracking-widest font-bold text-red-500 hover:text-red-400 flex items-center gap-2 transition-colors">
               <LogOut size={12} /> Disconnect
             </button>
          </form>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Artworks Portal */}
        <Link href="/dashboard/artworks/new" className="group block h-full">
          <div className="h-full bg-card border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-colors flex flex-col justify-between relative overflow-hidden group-hover:border-foreground/30">
            <div className="text-foreground mb-16">
              <Type size={32} strokeWidth={1.5} className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h2 className="font-serif text-2xl font-bold mb-2">Artworks</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Deploy Generative Code Art</p>
            </div>
            <div className="flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              <PlusSquare size={14} className="mr-2" /> Upload New
            </div>
          </div>
        </Link>

        {/* Photo Series Portal */}
        <Link href="/dashboard/photos/new" className="group block h-full">
          <div className="h-full bg-card border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-colors flex flex-col justify-between relative overflow-hidden group-hover:border-foreground/30">
            <div className="text-foreground mb-16">
              <Camera size={32} strokeWidth={1.5} className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h2 className="font-serif text-2xl font-bold mb-2">Photo Series</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Establish Photography Journals</p>
            </div>
            <div className="flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              <PlusSquare size={14} className="mr-2" /> Create Series
            </div>
          </div>
        </Link>

        {/* Configurations Portal */}
        <Link href="/dashboard/settings" className="group block h-full">
          <div className="h-full bg-card border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-colors flex flex-col justify-between relative overflow-hidden group-hover:border-orange-500/50">
            <div className="text-foreground mb-16">
              <Settings size={32} strokeWidth={1.5} className="mb-6 opacity-80 group-hover:opacity-100 transition-rotate" style={{ transitionDuration: '0.5s' }} />
              <h2 className="font-serif text-2xl font-bold mb-2">Identity Core</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Configure Visual Architecture</p>
            </div>
            <div className="flex items-center text-xs font-mono uppercase tracking-widest text-orange-500 group-hover:text-amber-400 transition-colors">
              Synchronize
            </div>
          </div>
        </Link>
      </div>

      {/* Database Statistics */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-16 p-8 border border-border/50 bg-card rounded-xl flex flex-col md:flex-row gap-8 justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-background rounded-full border border-border">
            <Database size={24} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold">Supabase Cluster</h3>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-bold mt-1">aws-1-ap-northeast-1 / port 6543</p>
          </div>
        </div>
        <div className="flex gap-12 font-mono text-xs uppercase tracking-widest text-muted-foreground text-center md:text-right">
          <div>
            <div className="text-foreground text-2xl mb-1">Live</div>
            <span className="text-[8px]">Connection Status</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
