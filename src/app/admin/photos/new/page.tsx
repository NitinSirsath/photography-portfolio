"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createPhotoSeriesAction } from '@/app/actions/photo'
import { Camera, ImagePlus } from 'lucide-react'

export default function NewPhotoSeriesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    const formData = new FormData(form)
    
    const response = await createPhotoSeriesAction(formData)

    if (!response.success) {
      setError(response.message || "Failed")
    } else {
      setSuccess("Photo Series Initialized! Ready for individual photo uploads.")
      form.reset()
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-4xl p-8 pt-32 pb-32">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl lg:text-6xl font-black tracking-tight mb-4 flex items-center gap-6">
          <Camera size={48} className="text-foreground" />
          Create Series
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-16 border-b border-border/50 pb-8">
          Establish a new photography narrative and upload its Hero Cover.
        </p>
      </motion.div>

      {error && <div className="text-red-500 font-mono text-xs mb-8 uppercase tracking-widest">{error}</div>}
      {success && <div className="text-green-500 font-mono text-xs mb-8 uppercase tracking-widest">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Metadata Specs */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Series Title</label>
              <input name="title" required className="w-full bg-transparent border-b border-border/50 py-3 text-lg font-serif outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30" placeholder="e.g. Shadows of Tokyo" />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Journal / Narrative</label>
              <textarea name="description" required rows={5} className="w-full bg-transparent border-b border-border/50 py-3 text-xs uppercase tracking-widest outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30" placeholder="A MONOKROMATIC EXPLORATION OF URBAN LIGHTING..." />
            </div>
            
            <div className="p-6 rounded-xl border border-dashed border-border/50 bg-background/50">
              <h4 className="font-serif text-lg mb-2">Phase 1 Implementation</h4>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                This component initializes the parent gallery struct. After creation, you'll be able to attach unlimited inner photos to this specific series id.
              </p>
            </div>
          </div>

          {/* Heavy Payload Upload */}
          <div className="flex flex-col h-full">
            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Primary Cover Asset</label>
            <div className="flex-1 relative border border-dashed border-border/50 rounded-2xl bg-card hover:bg-card/50 transition-colors flex flex-col items-center justify-center p-8 group cursor-pointer overflow-hidden min-h-[300px]">
              <input name="coverImage" type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                 <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-6 shadow-xl">
                   <ImagePlus size={24} />
                 </div>
                 <span className="font-serif text-xl mb-2">Select Hero Cover</span>
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
          {isSubmitting ? 'Transmitting...' : 'Initialize Series'}
        </button>
      </form>
    </div>
  )
}
