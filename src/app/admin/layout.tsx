export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 bg-background flex pt-24 min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border/50 p-8 hidden md:block">
        <h2 className="font-serif text-2xl font-bold mb-12 uppercase tracking-widest text-muted-foreground">Admin<br/>Console</h2>
        <nav className="space-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <div className="text-foreground border-b border-border/50 pb-2 mb-8">Artworks</div>
          <a href="#" className="block hover:text-foreground transition-colors">List Artworks</a>
          <a href="/admin/artworks/new" className="block text-foreground border-l border-foreground pl-4">Upload New</a>
          
          <div className="pt-8 pb-2 border-b border-border/50 mb-8 mt-8">Photo Series</div>
          <a href="#" className="block hover:text-foreground transition-colors">List Series</a>
          <a href="#" className="block hover:text-foreground transition-colors">Upload Photos</a>
        </nav>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
