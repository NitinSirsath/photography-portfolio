import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Link from "next/link"

export default async function PortfolioAboutPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) notFound()

  const profileConfig = user.profileConfig as { accentColor?: string } | null
  const accentColor = profileConfig?.accentColor || "#a6e22e" 
  const socialLinks = user.socialLinks as { twitter?: string, instagram?: string, behance?: string, website?: string } | null

  return (
    <div className="min-h-screen bg-background" style={{ '--accent': accentColor } as React.CSSProperties}>
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-48 h-48 mx-auto rounded-full border-4 flex items-center justify-center overflow-hidden shadow-2xl relative mb-8" style={{ borderColor: 'var(--accent)' }}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.displayName || user.username} className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif text-6xl font-black text-muted-foreground">
              {user.username.substring(0,2).toUpperCase()}
            </span>
          )}
        </div>
        <h1 className="font-serif text-5xl font-black mb-6">{user.displayName || user.username}</h1>
        {user.bio && (
          <p className="text-xl text-muted-foreground mb-12">{user.bio}</p>
        )}

        {user.isAvailableForHire && (
          <div className="mb-12">
            <a 
              href={`mailto:${user.email}`} 
              className="inline-block px-8 py-4 rounded-full font-bold text-background transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Hire Me
            </a>
          </div>
        )}

        <div className="flex items-center justify-center gap-6">
          {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" className="hover:text-[var(--accent)]">Twitter</a>}
          {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank" className="hover:text-[var(--accent)]">Instagram</a>}
          {socialLinks?.behance && <a href={socialLinks.behance} target="_blank" className="hover:text-[var(--accent)]">Behance</a>}
          {socialLinks?.website && <a href={socialLinks.website} target="_blank" className="hover:text-[var(--accent)]">Website</a>}
        </div>
      </div>
    </div>
  )
}
