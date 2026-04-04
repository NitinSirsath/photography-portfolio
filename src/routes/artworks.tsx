import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArtworkCard, type Artwork } from '@/components/ui/ArtworkCard'

export const Route = createFileRoute('/artworks')({
  component: ArtworksComponent,
})

const DUMMY_ARTWORKS: Artwork[] = [
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
          <ArtworkCard key={art.id} art={art} idx={idx} />
        ))}
      </div>
    </div>
  )
}
