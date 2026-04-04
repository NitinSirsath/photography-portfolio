import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-8 text-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-serif text-[5rem] md:text-[8rem] leading-none mb-4 text-foreground font-black tracking-tight flex items-start justify-center">
          Cinematic World
          <span className="text-2xl md:text-4xl ml-2 mt-4 md:mt-8 border-2 border-foreground rounded px-1.5 py-0.5 leading-none">®</span>
        </h1>
        <p className="text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase text-muted-foreground mb-32">
          Digital tools, algorithmic art and photography.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl px-8 w-full">
        {/* Placeholder for the algorithmic art */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 aspect-square rounded-2xl bg-card border border-border shadow-2xl overflow-hidden relative group"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-monokai-blue/10 to-monokai-green/10 mix-blend-overlay"></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
              {/* Fake abstract generic grid/shapes */}
              <div className="w-3/4 h-3/4 border border-monokai-blue/30 rounded-full rotate-45 transform flex items-center justify-center border-dashed">
                <div className="w-3/4 h-3/4 border border-monokai-green/30 rounded-lg rotate-12 transform"></div>
              </div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 text-left space-y-8 text-muted-foreground text-[16px] leading-relaxed max-w-md mx-auto lg:mx-0"
        >
          <p>
            Monokai is the creative studio of Wimer Hazenberg. He works at the intersection of code × design.
          </p>
          <p>
            In 2006 he created a color scheme for developers — also called Monokai — which is being used by millions of people around the world. Its most recent version is called <strong className="text-foreground font-serif text-lg tracking-wide ml-1 hover:text-primary transition-colors cursor-pointer">Monokai Pro</strong>.
          </p>
          <p>
            Currently he is creating 100% code-based <strong className="text-foreground font-serif text-lg tracking-wide ml-1 hover:text-primary transition-colors cursor-pointer">Algorithmic Art</strong>.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-32 w-full max-w-[80rem] px-4 md:px-8"
      >
        <div className="bg-[#18181A] dark:bg-[#111111] rounded-[4rem] py-32 flex flex-col items-center justify-center border border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-transparent pointer-events-none"></div>
          <h2 className="font-serif text-4xl md:text-[3.5rem] tracking-tight text-foreground mb-12 drop-shadow-sm font-bold relative z-10">
            View algorithmic artworks
          </h2>
          <button className="relative z-10 px-8 py-4 rounded-full bg-muted text-foreground text-[11px] tracking-widest uppercase font-bold hover:bg-muted-foreground hover:text-background transition-all duration-300">
            Selected Artworks
          </button>
        </div>
      </motion.div>
    </div>
  )
}
