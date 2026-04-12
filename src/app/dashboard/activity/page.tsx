import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Bell, Heart, MessageSquare, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default async function ActivityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const activities = await prisma.activity.findMany({
    where: { targetId: user.id },
    include: {
      actor: { select: { username: true, displayName: true, avatarUrl: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  // Mark all as read (fire and forget)
  try {
    prisma.activity.updateMany({
      where: { targetId: user.id, read: false },
      data: { read: true }
    }).catch(() => {})
  } catch (err) {}

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Network Activity</h1>
        <p className="text-muted-foreground">Recent interactions within your visual jurisdiction.</p>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border/50 rounded-2xl">
             <Bell size={32} className="mx-auto mb-4 text-muted-foreground/30" />
             <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Terminal Idle. No recent signals detected.</p>
          </div>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className={`flex items-start gap-4 p-6 rounded-2xl border transition-colors ${activity.read ? 'bg-card/30 border-border/30' : 'bg-card border-primary/20 shadow-lg shadow-primary/5'}`}>
              <div className="mt-1">
                {activity.type === 'LIKE' && <Heart size={18} className="text-red-500" />}
                {activity.type === 'COMMENT' && <MessageSquare size={18} className="text-blue-500" />}
                {activity.type === 'FOLLOW' && <UserPlus size={18} className="text-green-500" />}
              </div>
              
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                {activity.actor.avatarUrl ? (
                  <img src={activity.actor.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs">
                    {activity.actor.username[0].toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">
                  <Link href={`/${activity.actor.username}/home`} className="font-bold hover:underline">
                    @{activity.actor.username}
                  </Link>
                  <span className="text-muted-foreground">
                    {activity.type === 'LIKE' && " appreciated your work."}
                    {activity.type === 'COMMENT' && " left a comment on your deployment."}
                    {activity.type === 'FOLLOW' && " started following your archive."}
                  </span>
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-2">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>

              {activity.artworkId && (
                <Link href={`/dashboard/content`} className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity">
                   {/* We don't have the image here directly without another join, but for now a placeholder or a generic icon */}
                   <div className="w-full h-full flex items-center justify-center">
                     <Bell size={12} className="opacity-20" />
                   </div>
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
