"use client"

import { useState, useTransition } from "react"
import { toggleAppreciationAction } from "@/app/actions/engagement"
import { Star } from "lucide-react"

interface AppreciationModuleProps {
  targetId: string
  type: 'artwork' | 'photoSeries'
  initialCount: number
  isInitiallyAppreciated: boolean
}

export function AppreciationModule({ targetId, type, initialCount, isInitiallyAppreciated }: AppreciationModuleProps) {
  const [isPending, startTransition] = useTransition()
  
  // Optimistic UI State
  const [appreciated, setAppreciated] = useState(isInitiallyAppreciated)
  const [count, setCount] = useState(initialCount)

  const handleToggle = () => {
    // 1. Optmistic Immediate UI Update
    const newAppreciated = !appreciated
    setAppreciated(newAppreciated)
    setCount(newAppreciated ? count + 1 : count - 1)

    // 2. Background Database Sync
    startTransition(async () => {
      const result = await toggleAppreciationAction(targetId, type)
      // If server fails, revert optimistic state
      if (!result.success) {
        setAppreciated(appreciated)
        setCount(count)
      }
    })
  }

  return (
    <button 
      onClick={(e) => {
        e.preventDefault() // prevent navigating if wrapped in a link
        handleToggle()
      }} 
      disabled={isPending}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
        appreciated 
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
          : 'bg-background/80 border-border/50 text-muted-foreground hover:border-amber-500/30 hover:text-amber-500'
      } backdrop-blur-sm`}
    >
      <Star size={14} className={`transition-transform duration-300 ${appreciated ? 'fill-amber-500 scale-110' : 'group-hover:scale-110'}`} />
      <span className="font-mono text-xs font-bold">{count}</span>
    </button>
  )
}
