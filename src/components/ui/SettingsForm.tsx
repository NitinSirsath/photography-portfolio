"use client"

import { useState } from 'react'
import type { User } from '@prisma/client'
import { updateProfileAction } from '@/app/actions/user'
import { CheckCircle2 } from 'lucide-react'

export function SettingsForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Parse the profileConfig securely
  const config = (user.profileConfig as Record<string, any>) || {}
  const currentColor = config.accentColor || "#a6e22e"

  const [accentStr, setAccentStr] = useState(currentColor)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(false)
    
    // Convert to native FormData to pass to Next.js Server Action
    const formData = new FormData(e.currentTarget)
    const result = await updateProfileAction(formData)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      
      {/* Basic Metadata */}
      <section className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Display Name</label>
          <input 
            name="displayName"
            defaultValue={user.displayName || ''}
            className="w-full bg-card border border-border/50 rounded-xl px-4 py-4 font-serif text-lg outline-none focus:border-foreground transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Public Biography</label>
          <textarea 
            name="bio"
            defaultValue={user.bio || ''}
            className="w-full bg-card border border-border/50 rounded-xl px-4 py-4 min-h-[150px] text-sm outline-none focus:border-foreground transition-colors resize-y"
            placeholder="Documenting shadows and light..."
          />
        </div>
      </section>

      {/* Aesthetic Engine */}
      <section className="pt-8 border-t border-border/50 space-y-6">
         <div>
          <h2 className="font-serif text-2xl font-bold mb-2">Aesthetic Configuration</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-6">Modify the localized visual rules for your public `/username` route.</p>

          <label className="block text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Accent Hex Code</label>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-xl flex-shrink-0 border flex items-center justify-center overflow-hidden relative shadow-inner">
               <input 
                 name="accentColor"
                 type="color" 
                 value={accentStr}
                 onChange={(e) => setAccentStr(e.target.value)}
                 className="absolute inset-[-10px] w-20 h-20 cursor-pointer"
               />
            </div>
            <input 
              value={accentStr}
              onChange={(e) => setAccentStr(e.target.value)}
              className="flex-1 bg-card border border-border/50 rounded-xl px-4 py-4 font-mono text-sm outline-none focus:border-foreground"
              placeholder="#a6e22e"
            />
          </div>
        </div>
      </section>

      <div className="pt-8 flex items-center gap-6">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-foreground text-background px-8 py-4 rounded-xl flex items-center justify-center font-mono text-xs uppercase tracking-widest font-bold disabled:opacity-50 hover:scale-[0.98] transition-transform"
        >
          {isSubmitting ? 'Syncing...' : 'Synchronize Identity'}
        </button>

        {success && (
          <span className="flex items-center gap-2 text-[10px] font-mono text-green-500 uppercase tracking-widest font-bold animate-pulse">
            <CheckCircle2 size={16} /> Config Applied
          </span>
        )}
      </div>

    </form>
  )
}
