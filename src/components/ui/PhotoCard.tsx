import { motion } from 'framer-motion'

export interface PhotoSeries {
  id: number
  title: string
  desc: string
  count: number
}

interface PhotoCardProps {
  photo: PhotoSeries
  idx: number
}

export function PhotoCard({ photo, idx }: PhotoCardProps) {
  return (
    <motion.div
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
  )
}
