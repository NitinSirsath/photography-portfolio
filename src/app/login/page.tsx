"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
      console.error('Core Authorization Error:', error.message)
      alert(error.message)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    
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

        {/* PRIMARY: GOOGLE OAUTH */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white hover:bg-white/90 text-black py-4 rounded-xl hover:scale-[0.98] transition-transform shadow-lg mb-8"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Authenticate via Google</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-border/50 flex-1"></div>
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Or Secure Link</span>
          <div className="h-px bg-border/50 flex-1"></div>
        </div>

        {/* SECONDARY: MAGIC LINK */}
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
          <form onSubmit={handleMagicLink} className="space-y-4">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="architect@monokai.io"
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-4 text-sm outline-none focus:border-foreground transition-colors"
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-foreground/10 text-foreground py-4 rounded-xl hover:bg-foreground/20 transition-all font-mono text-xs uppercase tracking-widest font-bold disabled:opacity-50"
            >
              {loading ? 'Transmitting...' : 'Send Magic Link'}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 border-t border-border/50 pt-8">
          End-to-End Encrypted via Supabase Auth Protocol
        </p>
      </motion.div>
    </div>
  )
}
