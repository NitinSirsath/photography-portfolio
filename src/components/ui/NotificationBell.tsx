'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { toast } from 'sonner'

export function NotificationBell({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    // 1. Initial Fetch of unread count
    const fetchUnread = async () => {
      const { count } = await supabase
        .from('Activity')
        .select('*', { count: 'exact', head: true })
        .eq('targetId', userId)
        .eq('read', false)
      
      if (count !== null) setUnreadCount(count)
    }

    fetchUnread()

    // 2. Subscribe to new activities
    const channel = supabase
      .channel('realtime-activities')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Activity',
          filter: `targetId=eq.${userId}`
        },
        (payload) => {
          setUnreadCount(prev => prev + 1)
          toast('New interaction detected in your archive', {
            description: 'Check your activity feed for details.',
            action: {
              label: 'View',
              onClick: () => window.location.href = '/dashboard/activity'
            }
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  return (
    <Link 
      href="/dashboard/activity" 
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => setUnreadCount(0)}
    >
      <Bell size={18} />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background animate-pulse" />
      )}
    </Link>
  )
}
