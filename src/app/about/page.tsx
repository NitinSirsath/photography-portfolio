import Link from 'next/link'
import { Code2, Camera, Users, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background px-4 md:px-8">
      <div className="w-full max-w-4xl">

        <div className="mb-24">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
            About the <br/><span className="text-muted-foreground italic font-light">Platform</span>
          </h1>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground/80 font-bold border-y border-border/50 py-6">
            A professional visual archive for photographers, artists, and creators.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-24 max-w-2xl space-y-8 text-muted-foreground text-base leading-[1.8]">
          <p>
            This platform is a curated space for visual professionals to deploy, 
            organize, and showcase their highest-quality work. Think of it as your 
            permanent portfolio — a place where clients, collaborators, and peers 
            can discover what you create.
          </p>
          <p>
            Every creator gets a personalized vanity URL, a customizable profile 
            with brand colors, and a masonry gallery that does justice to images 
            of any aspect ratio. Social features like appreciations and comments 
            exist to validate quality, not chase engagement.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
            <Camera size={28} className="text-foreground" />
            <h3 className="font-serif text-xl font-bold">Photo Journals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Organize photography into curated series with cover images and 
              individual shots containing full EXIF metadata.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
            <Code2 size={28} className="text-foreground" />
            <h3 className="font-serif text-xl font-bold">Generative Artworks</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deploy algorithmic art, illustrations, and creative coding outputs 
              with full tagging and layout control.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
            <Users size={28} className="text-foreground" />
            <h3 className="font-serif text-xl font-bold">Community</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover other creators, follow their work, and engage through 
              professional appreciations and technical discussions.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
            <Shield size={28} className="text-foreground" />
            <h3 className="font-serif text-xl font-bold">Your Data, Your Domain</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every piece of content is owned by its creator. Secured with 
              row-level policies and encrypted authentication.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-border/50 pt-16">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to deploy your work?</h2>
          <p className="text-sm text-muted-foreground mb-8">Join the network and claim your vanity URL.</p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-4 bg-foreground text-background px-8 py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold hover:scale-[0.98] transition-transform"
          >
            Connect Identity
          </Link>
        </div>

      </div>
    </div>
  )
}
