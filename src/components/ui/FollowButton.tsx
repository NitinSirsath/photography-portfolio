'use client'

import { useState, useTransition } from 'react'
import { toggleFollowAction } from '@/app/actions/follow'
import { toast } from 'sonner'

export function FollowButton({ 
  targetUserId, 
  initialIsFollowing, 
  initialCount,
  isAuthenticated
}: { 
  targetUserId: string, 
  initialIsFollowing: boolean, 
  initialCount: number,
  isAuthenticated: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [count, setCount] = useState(initialCount)

  const handleToggle = () => {
    if (!isAuthenticated) {
      toast.error('Sign in to follow creators')
      return
    }

    // Optimistic update
    setIsFollowing(!isFollowing)
    setCount(c => isFollowing ? c - 1 : c + 1)

    startTransition(async () => {
      const res = await toggleFollowAction(targetUserId)
      if (!res.success) {
        // Revert on error
        setIsFollowing(isFollowing)
        setCount(count)
        toast.error(res.error || 'Failed to update follow status')
      } else {
        if (res.isFollowing) {
          toast.success('Following creator')
        } else {
          toast('Unfollowed creator')
        }
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className={`px-6 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-colors ${
          isFollowing 
            ? 'border border-border/50 text-muted-foreground hover:text-foreground' 
            : 'bg-foreground text-background hover:scale-105'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      <span className="font-mono text-xs text-muted-foreground">{count}</span>
    </div>
  )
}
