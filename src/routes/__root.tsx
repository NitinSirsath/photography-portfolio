import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 font-sans`}>
      <header className="absolute top-0 z-50 w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          <Link to="/" className="w-8 h-8 rounded border border-border flex items-center justify-center font-serif text-foreground hover:bg-white/5 transition-colors text-lg">
            M
          </Link>
          <Link to="/artworks" className="hover:text-foreground transition-colors [&.active]:text-foreground">
            Artworks
          </Link>
          <Link to="/photos" className="hover:text-foreground transition-colors [&.active]:text-foreground">
            Photos
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors [&.active]:text-foreground">
            About
          </Link>
        </div>
        <div>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-5 rounded-full border border-border flex items-center px-[2px] transition-colors"
          >
            <div className={`w-3.5 h-3.5 rounded-full bg-muted-foreground flex items-center justify-center transition-transform ${theme === 'dark' ? 'translate-x-[18px]' : ''}`}>
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="mt-16 py-12 px-8 border-t border-border opacity-60 text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex gap-24">
            <div className="space-y-4">
              <div className="font-bold mb-6">Contact</div>
              <div>For all enquiries:</div>
              <a href="mailto:hello@monokai.com" className="hover:text-foreground transition-colors">hello@monokai.com</a>
              <div className="mt-8 font-bold mb-6">Content</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-foreground transition-colors">RSS feed</a>
                <a href="#" className="hover:text-foreground transition-colors">Articles</a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-bold mb-6">Networks</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-foreground transition-colors">Monokai on Bluesky</a>
                <a href="#" className="hover:text-foreground transition-colors">Monokai on Farcaster</a>
                <a href="#" className="hover:text-foreground transition-colors">Monokai on X</a>
                <a href="#" className="hover:text-foreground transition-colors">Monokai on Instagram</a>
              </div>
            </div>
          </div>
          <div className="text-right space-y-4">
            <div className="font-bold mb-6 text-left md:text-right">Copyright</div>
            <div className="text-left md:text-right">© 2006 - {new Date().getFullYear()} Monokai</div>
          </div>
        </div>
      </footer>
      {/* <TanStackRouterDevtools /> */}
    </div>
  )
}
