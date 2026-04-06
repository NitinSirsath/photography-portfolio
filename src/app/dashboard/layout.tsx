export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 bg-background flex pt-24 min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border/50 p-8 hidden md:block">
        <a href="/dashboard" className="font-serif text-2xl font-bold mb-12 uppercase tracking-widest text-muted-foreground block hover:text-foreground transition-colors">Creator<br/>Studio</a>
        <nav className="space-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <div className="text-foreground border-b border-border/50 pb-2 mb-8">Artworks</div>
          <a href="/artworks" className="block hover:text-foreground transition-colors">View Live Grid</a>
          <a href="/dashboard/artworks/new" className="block text-foreground border-l border-foreground pl-4">Deploy Artwork</a>
          
          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Photo Series</div>
          <a href="/photos" className="block hover:text-foreground transition-colors">View Archive</a>
          <a href="/dashboard/photos/new" className="block hover:text-foreground transition-colors">Deploy Series</a>

          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Configurations</div>
          <a href="/dashboard/settings" className="block text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2">
            Identity Core
          </a>
        </nav>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
