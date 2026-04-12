'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { uploadPhotoToSeriesAction } from '@/app/actions/photo-upload'
import { toast } from 'sonner'
import Link from 'next/link'

export default function UploadPhotoPage() {
  const params = useParams()
  const seriesId = params.seriesId as string
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('seriesId', seriesId)

    const res = await uploadPhotoToSeriesAction(formData)
    if (res.success) {
      toast.success('Photo deployed successfully')
      router.push(`/dashboard/photos/${seriesId}`)
    } else {
      toast.error(res.error || 'Failed to deploy photo')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto w-full">
      <div className="mb-12 border-b border-border/50 pb-8">
        <Link href={`/dashboard/photos/${seriesId}`} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">← Back to Series</Link>
        <h1 className="font-serif text-4xl font-bold mb-2">Deploy Photo</h1>
        <p className="text-muted-foreground">Add a new shot to the journal.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Image File</label>
          <input type="file" name="file" accept="image/*" required className="w-full bg-card border border-border/50 rounded px-4 py-3" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Aperture</label>
            <input name="aperture" placeholder="f/2.8" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Shutter Speed</label>
            <input name="shutterSpeed" placeholder="1/250s" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Focal Length</label>
            <input name="focalLength" placeholder="35mm" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">ISO</label>
            <input name="iso" placeholder="400" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-foreground text-background font-bold py-4 rounded hover:opacity-90">
          {isSubmitting ? 'Deploying...' : 'Deploy Photo'}
        </button>
      </form>
    </div>
  )
}
