import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { DashboardGrid } from '@/components/ui/DashboardGrid'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fully lock the user context natively to Postgres before rendering the interface
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email }
  })

  if (!dbUser) {
    console.error("Critical Failure: User exists in Auth but not in Postgres schema.")
    redirect('/login')
  }

  // 2. Pass the hydrated multi-tenant context directly to the responsive UI layout
  return <DashboardGrid user={dbUser} />
}
