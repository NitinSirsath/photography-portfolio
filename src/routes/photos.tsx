import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/photos')({
  component: PhotosComponent,
})

const DUMMY_PHOTOS = [
  { id: 1, title: 'Andalusia, Spain', desc: "SEVILLE'S PLAZAS, RONDA'S GORGE AND GRANADA'S ARCHITECTURE", count: 27 },
  { id: 2, title: 'Coast of Brittany', desc: 'RUGGED COASTLINES AND CELTIC HERITAGE', count: 18 },
  { id: 3, title: 'Winter in Amsterdam', desc: 'SNOW TRANSFORMS THE CITY INTO MONOCHROME', count: 32 },
  { id: 4, title: 'Tokyo, Japan', desc: 'NEON LIGHTS, ALLEYWAYS, AND DENSE POPULATIONS', count: 45 },
  { id: 5, title: 'Isle of Skye', desc: 'LUSH GREEN VALLEYS COVERED IN MIST', count: 21 },
  { id: 6, title: 'Neo Faliro', desc: 'DECAYING BOATS AT THE SHORE', count: 14 },
  { id: 7, title: 'The Carriers', desc: 'A PHOTO SERIES ABOUT MAJESTIC WINTER MACHINES', count: 19 },
  { id: 8, title: 'Environmental Operation', desc: 'A PHOTO SERIES EXPLORING TRANSFORMATION', count: 24 },
  { id: 9, title: 'Parco Dei Mostri', desc: 'THE 16TH CENTURY GARDEN OF BOMARZO', count: 16 },
]

function PhotosComponent() {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 text-center bg-background px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-[4rem] md:text-[6.5rem] leading-none mb-4 text-foreground font-black tracking-tight">
          Photos
        </h1>
        <p className="text-[9px] md:text-[11px] tracking-[0.2em] font-bold uppercase text-muted-foreground mb-24">
          A selection of photo series shot in the moment.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_PHOTOS.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
            className="relative group rounded-[2rem] overflow-hidden cursor-pointer bg-card border border-border/50 aspect-square shadow-sm"
          >
            {/* Dummy Backdrop */}
            <div className={`absolute inset-0 flex items-center justify-center opacity-40 mix-blend-luminosity bg-gradient-to-tr ${idx % 3 === 0 ? 'from-green-900/20 to-blue-900/20' : idx % 3 === 1 ? 'from-orange-900/20 to-yellow-900/20' : 'from-purple-900/20 to-pink-900/20'}`}>
              <div className="w-1/3 h-1/3 rounded-full blur-3xl bg-foreground/10"></div>
            </div>

            {/* Hover Circular Button */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md flex flex-col items-center justify-center scale-90 group-hover:scale-100 transition-all duration-300 shadow-2xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-black/40"></div>
                 <div className="relative z-10 flex flex-col items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full mb-2"></div>
                   <span className="text-[9px] font-bold tracking-[0.2em] text-white uppercase">View Photos</span>
                 </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/80 to-transparent flex flex-col items-start text-left text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <h2 className="font-serif text-3xl font-bold mb-2 shadow-sm text-white">{photo.title}</h2>
              <p className="text-[8px] uppercase tracking-[0.15em] font-bold text-white/60 mb-4 line-clamp-1">
                {photo.desc}
              </p>
              <div className="px-3 py-1 rounded-full border border-white/20 text-[8px] tracking-widest uppercase text-white/90 bg-black/50">
                {photo.count} Photos
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
