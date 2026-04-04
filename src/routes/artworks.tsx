import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

export const Route = createFileRoute('/artworks')({
  component: ArtworksComponent,
})

const DUMMY_ARTWORKS = [
  { id: 1, title: 'Abstract System', desc: 'AN EXPLORATION OF NOISE AND GEOMETRIC GRIDS.', aspect: 'aspect-[4/3]', span: 'md:col-span-2' },
  { id: 2, title: 'Origin', desc: 'WHAT HAPPENS WHEN AN AI LOOKS INWARD', aspect: 'aspect-square', span: 'md:col-span-1' },
  { id: 3, title: 'Universal Ray', desc: 'AN ALGORITHMIC ARTWORK BY MONOKAI', aspect: 'aspect-square', span: 'md:col-span-1' },
  { id: 4, title: 'Release', desc: 'A 3D SCENE BUILT WITH PURE MATHEMATICS', aspect: 'aspect-square', span: 'md:col-span-1' },
  { id: 5, title: 'Sliced in Time', desc: 'ISOLATES RANDOM PARTICLES IN FINITE TIME SLICES', aspect: 'aspect-video', span: 'md:col-span-2' },
  { id: 6, title: 'Drifters', desc: 'EXPLORING THE OTHERWORLDLY IN THE ABYSS', aspect: 'aspect-square', span: 'md:col-span-1', tags: ['ANIMATION', 'CHOREOGRAPHY'] },
  { id: 7, title: 'Fire Card', desc: 'GENERATIVE ARTWORK BASED ON A CENTURY OLD FIRE', aspect: 'aspect-square', span: 'md:col-span-1' },
]

function ArtworksComponent() {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 text-center bg-background px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-[4rem] md:text-[6.5rem] leading-none mb-4 text-foreground font-black tracking-tight">
          Artworks
        </h1>
        <p className="text-[9px] md:text-[11px] tracking-[0.2em] font-bold uppercase text-muted-foreground mb-24">
          Selected 100% code-based algorithmic art.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
        {DUMMY_ARTWORKS.map((art, idx) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-card border border-border/50 ${art.span} ${art.aspect}`}
          >
            {/* Dummy Placeholder Canvas */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center opacity-30">
               {/* Pattern Placeholder */}
               <div className="w-1/2 h-1/2 border border-foreground/10 rounded-full mix-blend-overlay"></div>
            </div>

            {/* Hover overlay with button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                 <div className="w-1.5 h-1.5 bg-white rounded-full mb-1"></div>
                 <span className="text-[8px] font-bold tracking-widest text-white uppercase">View</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-start text-left text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="font-serif text-3xl font-bold mb-2 shadow-sm text-white/90 group-hover:text-white transition-colors">{art.title}</h2>
              <p className="text-[9px] uppercase tracking-widest font-bold text-white/70 mb-3 line-clamp-1">
                {art.desc}
              </p>
              {art.tags && (
                <div className="flex gap-2">
                  {art.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full border border-white/20 text-[8px] tracking-widest uppercase text-white/80 bg-black/40">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
