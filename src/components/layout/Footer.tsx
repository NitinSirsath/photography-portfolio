export function Footer() {
  return (
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
  )
}
