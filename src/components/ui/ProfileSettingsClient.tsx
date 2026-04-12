'use client'

import { useState } from 'react'
import type { User } from '@prisma/client'
import { updateProfileAction } from '@/app/actions/user'
import { CheckCircle2 } from 'lucide-react'
import { ProfileConfig, SocialLinks } from '@/types/profile'

export function ProfileSettingsClient({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const config = (user.profileConfig as ProfileConfig) || {}
  const links = (user.socialLinks as SocialLinks) || {}
  
  const [previewAccent, setPreviewAccent] = useState(config.accentColor || "#ffffff")
  const [previewBg, setPreviewBg] = useState(config.backgroundColor || "#0a0a0a")
  const [previewFg, setPreviewFg] = useState(config.textColor || "#fafafa")
  const [previewFont, setPreviewFont] = useState(config.fontFamily || "serif")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(false)
    
    const formData = new FormData(e.currentTarget)
    const result = await updateProfileAction(formData)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <form onSubmit={handleSubmit} className="space-y-12">
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold">Basic Information</h2>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Display Name</label>
            <input name="displayName" defaultValue={user.displayName || ''} className="w-full bg-card border border-border/50 rounded flex px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Bio</label>
            <textarea name="bio" defaultValue={user.bio || ''} className="w-full bg-card border border-border/50 rounded px-4 py-3 min-h-[100px] outline-none" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Avatar URL (Temporary Text Input)</label>
            <input name="avatarUrl" defaultValue={user.avatarUrl || ''} className="w-full bg-card border border-border/50 rounded flex px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Logo Text</label>
            <input name="logoText" defaultValue={config.logoText || ''} className="w-full bg-card border border-border/50 rounded flex px-4 py-3 outline-none" placeholder={user.username[0].toUpperCase()} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isAvailableForHire" defaultChecked={user.isAvailableForHire} className="w-4 h-4 cursor-pointer" id="hireToggle" />
            <label htmlFor="hireToggle" className="text-sm font-bold cursor-pointer">Available for Hire</label>
          </div>
        </section>

        <section className="space-y-6 border-t border-border/50 pt-8">
          <h2 className="font-serif text-2xl font-bold">Aesthetics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Accent Color</label>
              <input type="color" name="accentColor" value={previewAccent} onChange={(e) => setPreviewAccent(e.target.value)} className="w-full h-12 rounded cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Background Color</label>
              <input type="color" name="backgroundColor" value={previewBg} onChange={(e) => setPreviewBg(e.target.value)} className="w-full h-12 rounded cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Text Color</label>
              <input type="color" name="textColor" value={previewFg} onChange={(e) => setPreviewFg(e.target.value)} className="w-full h-12 rounded cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Font Family</label>
              <select name="fontFamily" value={previewFont} onChange={(e) => setPreviewFont(e.target.value as any)} className="w-full h-12 bg-card border border-border/50 rounded px-4">
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans-serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-t border-border/50 pt-8">
          <h2 className="font-serif text-2xl font-bold">Social & Support</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Support Link (Tip Jar / Ko-fi / Patreon)</label>
              <input name="tipJarUrl" defaultValue={user.tipJarUrl || ''} placeholder="https://ko-fi.com/username" className="w-full bg-card border border-border/50 rounded px-4 py-3 outline-none focus:border-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="twitter" defaultValue={links.twitter || ''} placeholder="Twitter URL" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
              <input name="instagram" defaultValue={links.instagram || ''} placeholder="Instagram URL" className="w-full bg-card border border-border/50 rounded px-4 py-3" />
            </div>
          </div>
        </section>

        <div className="pt-8 flex items-center gap-6">
          <button type="submit" disabled={isSubmitting} className="bg-foreground text-background px-8 py-3 rounded font-bold hover:opacity-90">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          {success && <span className="text-green-500 font-bold flex items-center gap-2"><CheckCircle2 size={16} /> Saved!</span>}
        </div>
      </form>

      {/* Live Preview Panel */}
      <div className="relative sticky top-32 border border-border/50 rounded-2xl overflow-hidden h-[600px] flex flex-col shadow-2xl transition-colors duration-300" style={{ backgroundColor: previewBg, color: previewFg, fontFamily: previewFont }}>
        <div className="p-4 border-b border-border/30 flex justify-between items-center text-xs opacity-50 uppercase tracking-widest font-bold font-mono">
          <span>Live Preview</span>
          <span>@username</span>
        </div>
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full border-4 mb-6 flex items-center justify-center font-bold text-4xl" style={{ borderColor: previewAccent, color: previewAccent }}>
             {(user.displayName || user.username)[0].toUpperCase()}
          </div>
          <h1 className="text-4xl font-bold mb-4">{user.displayName || user.username}</h1>
          <p className="opacity-80 max-w-sm mb-8">{user.bio || 'Visual artist and architectural observer.'}</p>
          <button className="px-6 py-2 border rounded-full hover:opacity-80 transition-opacity" style={{ borderColor: previewAccent, color: previewAccent }}>
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}
