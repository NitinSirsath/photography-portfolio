"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    
    // Send a secure Magic Link to their email
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
      console.error('Core Authorization Error:', error.message)
      alert(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 border border-border/50 rounded-3xl bg-card shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-20"></div>
        
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl font-bold mb-2">Connect Identity</h1>
          <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
            Join the Monokai Public Ecosystem
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-serif text-xl font-bold">Mail Sent</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              We dispatched a secure magic link to {email}. Check your inbox to enter the dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Email Terminal</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@monokai.io"
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-4 text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-foreground text-background py-4 rounded-xl hover:scale-[0.98] transition-all shadow-lg font-mono text-xs uppercase tracking-widest font-bold disabled:opacity-50"
            >
              {loading ? 'Transmitting...' : 'Send Magic Link'}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 border-t border-border/50 pt-8">
          Passwordless Entry via Supabase Protocol
        </p>
      </motion.div>
    </div>
  )
}
