import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { ProfileSettingsClient } from '@/components/ui/ProfileSettingsClient'

export default async function PortfolioSettingsPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { username }
  })

  if (!dbUser) notFound()

  // Ensure only the owner can access
  if (dbUser.id !== user.id) {
    redirect(`/${username}/home`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24">
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Profile Customization</h1>
        <p className="text-muted-foreground">Modify your portfolio's public presence and aesthetic rules.</p>
      </div>

      <ProfileSettingsClient user={dbUser} />
    </div>
  )
}
