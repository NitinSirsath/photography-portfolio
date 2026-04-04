import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Aperture, Settings, Maximize, Clock } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="flex-1 flex flex-col items-center pt-32 pb-24 bg-background px-4 md:px-8">
      <div className="w-full max-w-4xl flex flex-col items-start text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-serif text-[4rem] md:text-[6.5rem] leading-none mb-12 text-foreground font-black tracking-tight">
            Biography
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24 mb-24 w-full">
          {/* Main Biography Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3 space-y-8 text-muted-foreground text-[16px] leading-[1.8]"
          >
            <p>
              Wimer Hazenberg has studied photography in art school and holds a MSc in Artificial
              Intelligence. His creative tools consist of photos, data and code.
            </p>
            <p>
              Born as an 80s kid, he learned to program at an early age and developed a lasting fascination
              with how computers can produce aesthetically interesting work. This has led to a series of <strong className="text-foreground tracking-wide font-serif">Algorithmic Artworks</strong> in which he explores how algorithms and carefully calibrated randomness can generate art that is both unexpected and within the intended constraints.
            </p>
            <p>
              Wimer is originally from Friesland, The Netherlands. He's currently living and working in Amsterdam.
            </p>
          </motion.div>

          {/* Right sidebar micro-info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/3 pt-2"
          >
            <h3 className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-3">Algorithmic Artworks</h3>
            <p className="text-xs text-muted-foreground/80 leading-relaxed mb-1">
              Art created entirely with code, no AI involved.
            </p>
            <a href="#" className="text-xs text-foreground/80 hover:text-foreground border-b border-foreground/30 hover:border-foreground transition-all">
              Read more in this article.
            </a>
          </motion.div>
        </div>

        {/* Massive Centered Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-square md:aspect-[4/3] rounded-[2rem] bg-card border border-border/50 relative overflow-hidden mb-32 shadow-xl group"
        >
          {/* Dummy Placeholder View */}
          <div className="absolute inset-0 bg-gradient-to-tr from-muted to-background opacity-20"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Vague representation of a figure looking out to sea from the screenshot */}
            <div className="w-2/3 h-1/2 border-b-2 border-dashed border-border flex items-end justify-center pb-0">
               <div className="w-8 h-24 rounded-t-full bg-border/40"></div>
            </div>
          </div>

          {/* Bottom Left Exif Badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 p-1.5 px-3">
            <div className="flex items-center gap-1.5 border-r border-white/20 pr-3 mr-1 text-white/80">
              <Aperture size={10} />
              <span className="text-[10px] uppercase font-mono tracking-widest mt-0.5">f/</span>
            </div>
            <div className="flex items-center gap-1.5 border-r border-white/20 pr-3 mr-1 text-white/80">
              <Clock size={10} />
              <span className="text-[10px] uppercase font-mono tracking-widest mt-0.5">s</span>
            </div>
            <div className="flex items-center gap-1.5 border-r border-white/20 pr-3 mr-1 text-white/80">
              <Maximize size={10} />
              <span className="text-[10px] uppercase font-mono tracking-widest mt-0.5">mm</span>
            </div>
            <div className="flex items-center gap-1.5 pl-1 text-white/80">
              <Settings size={10} />
              <span className="text-[10px] uppercase font-mono tracking-widest mt-0.5">ISO</span>
            </div>
          </div>

          {/* Right Vertical Copyright */}
          <div className="absolute bottom-16 right-4 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/50 font-bold whitespace-nowrap">
              © 2006 - {new Date().getFullYear()} MONOKAI. ALL RIGHTS RESERVED
            </p>
          </div>
        </motion.div>

        {/* Awards and Exhibitions */}
        <div className="w-full space-y-24">
          {/* Awards */}
          <div>
            <h3 className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-12">Awards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-lg opacity-50">&rarr;</span> A Trip to Japan
                  </h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    Awwwards Site of the Day<br/>2019
                  </p>
                </div>
                <div className="pt-8">
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-lg opacity-50">&rarr;</span> Fire Card
                  </h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    Tender Icon Award<br/>2021
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-lg opacity-50">&rarr;</span> Minimal Wim
                  </h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    Awwwards Site of the Day<br/>2020
                  </p>
                </div>
                <div className="pt-8">
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                    Monokai
                  </h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    FWA Site of the Day<br/>2004
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exhibitions */}
          <div>
            <h3 className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-12">Featured in Exhibitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  NFTJapan
                </h4>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                  TOKYO TOWER<br/>
                  Minato City, Tokyo, Japan<br/>
                  2025
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Art Golden GAI
                </h4>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                  SAISON DAIKANYAMA<br/>
                  Shibuya, Tokyo, Japan<br/>
                  2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
