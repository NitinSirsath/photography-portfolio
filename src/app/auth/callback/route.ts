import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch { }
          },
        },
      }
    )
    
    // Exchanges the Google auth code for an active user session cookie
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session?.user) {
      // -------------------------------------------------------------
      // PLATFORM SYNCHRONIZATION:
      // When Supabase authenticates a user, they are stored securely 
      // in the hidden 'auth' schema. We must transpose them into our
      // public Prisma tables so they can actually own Artworks!
      // -------------------------------------------------------------
      const authUser = session.user
      
      const existingUser = await prisma.user.findUnique({
        where: { email: authUser.email }
      })

      if (!existingUser && authUser.email) {
        // Generate a clean vanity URL name from their email 
        const baseName = authUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
        
        await prisma.user.create({
          data: {
            id: authUser.id, // Explicitly map Supabase Auth UUID to our Prisma CUID/UUID
            email: authUser.email,
            username: baseName, 
            displayName: authUser.user_metadata?.full_name || baseName,
            avatarUrl: authUser.user_metadata?.avatar_url || '',
          }
        })
      }

      // Route the authenticated user directly into their new personal dashboard!
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
