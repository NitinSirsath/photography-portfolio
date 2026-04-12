import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Safe-guard to prevent website crashing when Anon Key rests empty
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Validate the user's active session
  const { data: { user } } = await supabase.auth.getUser()

  // Guard Clause: Prevent unauthorized access to the Creator Studio
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from the marketing page to their portfolio
  if (request.nextUrl.pathname === '/' && user) {
    // Fetch their username from the DB via the API route to avoid Prisma in Edge runtime
    const profileRes = await fetch(`${request.nextUrl.origin}/api/me`, {
      headers: { Cookie: request.headers.get('cookie') || '' },
    })
    if (profileRes.ok) {
      const { username } = await profileRes.json()
      if (username) {
        return NextResponse.redirect(new URL(`/${username}/home`, request.url))
      }
    }
    // Fallback: if we can't resolve username yet, send to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
