import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ContentList } from '@/components/ui/ContentList'

export default async function ContentManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      artworks: { orderBy: { createdAt: 'desc' } },
      photoSeries: { orderBy: { createdAt: 'desc' } }
    }
  })

  if (!dbUser) redirect('/login')

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Content Archive</h1>
          <p className="text-muted-foreground">Manage your deployed visual assets.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/artworks/new" className="px-6 py-3 bg-foreground text-background font-bold rounded hover:opacity-90">
            Upload Artwork
          </Link>
          <Link href="/dashboard/photos/new" className="px-6 py-3 bg-foreground text-background font-bold rounded hover:opacity-90">
            Create Series
          </Link>
        </div>
      </div>

      <ContentList artworks={dbUser.artworks} photoSeries={dbUser.photoSeries} />
    </div>
  )
}
