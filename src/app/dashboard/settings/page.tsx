import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/ui/SettingsForm'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email }
  })

  if (!dbUser) redirect('/login')

  return (
    <div className="w-full max-w-2xl pt-32 pb-32">
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-serif text-4xl font-bold mb-2 text-foreground">Identity Core</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          Configure Public Matrix Parameters
        </p>
      </div>

      <SettingsForm user={dbUser} />
    </div>
  )
}
