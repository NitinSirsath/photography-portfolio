'use client'

import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

export function ShareButton({ title, url }: { title: string, url: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        })
        toast.success('Shared successfully')
      } catch (err) {
        // user cancelled or error
      }
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="p-2 rounded-full hover:bg-foreground/10 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
      aria-label="Share"
    >
      <Share2 size={18} />
    </button>
  )
}
