import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { BarChart3, TrendingUp, Users, Heart, Eye } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      _count: { select: { followers: true } },
      artworks: {
        include: { _count: { select: { likes: true } } }
      },
      photoSeries: {
        include: { _count: { select: { likes: true } } }
      }
    }
  })

  if (!dbUser) redirect('/login')

  const totalLikes = dbUser.artworks.reduce((sum, a) => sum + a._count.likes, 0) + 
                     dbUser.photoSeries.reduce((sum, s) => sum + s._count.likes, 0)

  const allWorks = [
    ...dbUser.artworks.map(a => ({ id: a.id, title: a.title, likes: a._count.likes, type: 'Artwork', image: a.imageUrl })),
    ...dbUser.photoSeries.map(s => ({ id: s.id, title: s.title, likes: s._count.likes, type: 'Series', image: s.coverImage }))
  ].sort((a, b) => b.likes - a.likes)

  const topWorks = allWorks.slice(0, 5)

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-muted-foreground">Monitor the deployment impact of your visual assets.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-muted-foreground">
            <Eye size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Total Portfolio Views</span>
          </div>
          <div className="text-5xl font-serif font-black">{dbUser.portfolioViews}</div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-muted-foreground">
            <Users size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Network Followers</span>
          </div>
          <div className="text-5xl font-serif font-black">{dbUser._count.followers}</div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-muted-foreground">
            <Heart size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Global Appreciations</span>
          </div>
          <div className="text-5xl font-serif font-black">{totalLikes}</div>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={20} className="text-muted-foreground" />
            <h2 className="font-serif text-2xl font-bold">Impactful Assets</h2>
          </div>
          <div className="space-y-4">
            {topWorks.map((work, idx) => (
              <div key={work.id} className="flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-xl">
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img src={work.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{work.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{work.type}</p>
                </div>
                <div className="text-right">
                  <div className="font-serif font-black text-xl">★ {work.likes}</div>
                  <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Rank #{idx + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 size={20} className="text-muted-foreground" />
            <h2 className="font-serif text-2xl font-bold">Platform Status</h2>
          </div>
          <div className="p-8 border border-border/50 bg-card/30 rounded-2xl">
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Hire Visibility</span>
                   <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${dbUser.isAvailableForHire ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                     {dbUser.isAvailableForHire ? 'Public' : 'Hidden'}
                   </span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Archive Density</span>
                   <span className="font-serif font-bold">{dbUser.artworks.length + dbUser.photoSeries.length} Elements</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Joined At</span>
                   <span className="font-mono text-[10px] uppercase tracking-widest font-bold">{new Date(dbUser.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
