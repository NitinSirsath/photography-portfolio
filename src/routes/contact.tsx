import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
})

function ContactComponent() {
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SENT'>('IDLE')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('TRANSMITTING')
    setTimeout(() => setStatus('SENT'), 1500)
  }

  return (
    <div className="container max-w-2xl mx-auto py-16 px-8">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl text-foreground">
          Initialize <span className="text-monokai-purple">Connection</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          // Awaiting secure payload transmission...
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 border border-border rounded-lg shadow-lg">
        <div className="space-y-2">
          <label htmlFor="name" className="mono-label text-monokai-orange">
            const clientName =
          </label>
          <input 
            type="text" 
            id="name"
            required
            className="w-full bg-background border border-border p-3 text-foreground font-mono focus:outline-none focus:border-monokai-orange focus:ring-1 focus:ring-monokai-orange transition-all"
            placeholder='"Your Name"'
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="mono-label text-monokai-yellow">
            const clientEmail =
          </label>
          <input 
            type="email" 
            id="email"
            required
            className="w-full bg-background border border-border p-3 text-foreground font-mono focus:outline-none focus:border-monokai-yellow focus:ring-1 focus:ring-monokai-yellow transition-all"
            placeholder='"you@domain.com"'
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="mono-label text-monokai-green">
            const payload =
          </label>
          <textarea 
            id="message"
            required
            rows={5}
            className="w-full bg-background border border-border p-3 text-foreground font-mono focus:outline-none focus:border-monokai-green focus:ring-1 focus:ring-monokai-green transition-all resize-none"
            placeholder='`Describe your project requirements here...`'
          />
        </div>

        <button 
          type="submit"
          disabled={status !== 'IDLE'}
          className="w-full py-4 bg-monokai-purple text-background font-bold font-mono hover:bg-monokai-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'IDLE' && '> await transmit()'}
          {status === 'TRANSMITTING' && '> transmitting...'}
          {status === 'SENT' && '> payload_delivered'}
        </button>
      </form>
    </div>
  )
}
