"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createArtworkAction } from '@/app/actions/artwork'
import { UploadCloud } from 'lucide-react'

export default function NewArtworkPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    
    // We send this massive blob of data across the boundary to the Node.js action
    const response = await createArtworkAction(formData)

    if (!response.success) {
      setError(response.message || "Failed")
    } else {
      setSuccess("Artwork deployed successfully! It is now live.")
      e.currentTarget.reset()
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-4xl p-8 pt-32 pb-32">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl lg:text-6xl font-black tracking-tight mb-4">Deploy Artwork</h1>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-16 border-b border-border/50 pb-8">
          Upload binary image data to cloud and sync to Postgres schemas.
        </p>
      </motion.div>

      {error && <div className="text-red-500 font-mono text-xs mb-8 uppercase tracking-widest">{error}</div>}
      {success && <div className="text-green-500 font-mono text-xs mb-8 uppercase tracking-widest">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Metadata Specs */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Title</label>
              <input name="title" required className="w-full bg-transparent border-b border-border/50 py-3 text-lg font-serif outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30" placeholder="e.g. Sliced in Time" />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Subtitle / Description</label>
              <textarea name="description" required rows={3} className="w-full bg-transparent border-b border-border/50 py-3 text-xs uppercase tracking-widest outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30" placeholder="ISOLATES RANDOM PARTICLES IN FINITE TIME SLICES" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Aspect Layout</label>
                <select name="aspectRatio" className="w-full bg-card border border-border/50 py-2 px-3 text-xs uppercase tracking-widest outline-none rounded-lg focus:border-foreground appearance-none">
                  <option value="aspect-square">Square (1:1)</option>
                  <option value="aspect-[4/3]">Landscape (4:3)</option>
                  <option value="aspect-[3/4]">Portrait (3:4)</option>
                  <option value="aspect-video">Ultra-wide (16:9)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Column Span</label>
                <select name="colSpan" className="w-full bg-card border border-border/50 py-2 px-3 text-xs uppercase tracking-widest outline-none rounded-lg focus:border-foreground appearance-none">
                  <option value="col-span-1 md:col-span-1">1 Column</option>
                  <option value="col-span-1 md:col-span-2">2 Columns</option>
                  <option value="col-span-1 md:col-span-3">3 Columns</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Tags (Comma Separated)</label>
              <input name="tags" className="w-full bg-transparent border-b border-border/50 py-3 text-xs uppercase tracking-widest outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30" placeholder="e.g. ANIMATION, GENERATIVE" />
            </div>
          </div>

          {/* Heavy Payload Upload */}
          <div className="flex flex-col h-full">
            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">High Resolution Asset</label>
            <div className="flex-1 relative border border-dashed border-border/50 rounded-2xl bg-card hover:bg-card/50 transition-colors flex flex-col items-center justify-center p-8 group cursor-pointer overflow-hidden min-h-[300px]">
              <input name="image" type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                 <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-6 shadow-xl">
                   <UploadCloud size={24} />
                 </div>
                 <span className="font-serif text-xl mb-2">Select Artwork</span>
                 <span className="text-[9px] uppercase tracking-[0.2em]">Up to 10MB • JPG, WEBP, PNG</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-5 bg-foreground text-background font-bold text-[10px] uppercase tracking-[0.2em] rounded-full hover:scale-95 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Transmitting to Cloud...' : 'Commit to Database'}
        </button>
      </form>
    </div>
  )
}
