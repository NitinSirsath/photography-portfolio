import Link from 'next/link'
import { ArrowRight, Layout, Globe, Briefcase } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Visual Archive — Platform",
  description: "Your portfolio. Your identity. Your domain. The professional home for photographers and visual artists.",
  openGraph: {
    images: ['/og-image.jpg'], // Assuming a default OG image exists or will exist
  }
}

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 text-center overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] animate-fade-in">
            Your portfolio.<br />
            Your identity.<br />
            <span className="text-muted-foreground italic font-light group">Your domain.</span>
          </h1>
          
          <p className="max-w-xl mx-auto font-mono text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground font-medium animate-fade-in-slow">
            The professional home for photographers and visual artists.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-slow">
            <Link 
              href="/login" 
              className="group relative flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
            >
              Claim Your Portfolio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/community" 
              className="px-8 py-4 border border-border/50 rounded-full font-medium hover:bg-card transition-colors"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-card/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 rounded-3xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary">
                <Layout size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold">Portfolio Takeover</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every creator gets a fully branded mini-site. Your work, your colors, your fonts. No platform distractions.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary">
                <Globe size={18} />
              </div>
              <h3 className="font-serif text-2xl font-bold">Community Discovery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get discovered on our unified feed. Connect with other creators and build your audience in the global archive.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl border border-border/50 bg-background/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary">
                <Briefcase size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold">Creator Studio</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A powerful dashboard to manage your content. Organize photo series, artworks, and your personal brand with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl font-bold tracking-tight">Ready to deploy?</h2>
          <p className="text-muted-foreground">Join the next generation of visual storytellers.</p>
          <div className="pt-4">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

