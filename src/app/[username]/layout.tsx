import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { PortfolioNavbar } from '@/components/layout/PortfolioNavbar'

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) notFound()

  const profileConfig = user.profileConfig as {
    accentColor?: string
    backgroundColor?: string
    textColor?: string
    fontFamily?: string
  } | null

  // Defaults based on Phase 1 & PRD
  const bg = profileConfig?.backgroundColor || '#0a0a0a'
  const fg = profileConfig?.textColor || '#fafafa'
  const accent = profileConfig?.accentColor || '#ffffff'
  const font = profileConfig?.fontFamily === 'sans-serif' ? 'sans-serif' : profileConfig?.fontFamily === 'monospace' ? 'monospace' : 'serif'

  return (
    <div 
      className="flex-1 flex flex-col min-h-screen" 
      style={{
        '--bg': bg,
        '--fg': fg,
        '--accent': accent,
        '--font': font,
        backgroundColor: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'var(--font)'
      } as React.CSSProperties}
    >
      <PortfolioNavbar username={username} profileConfig={user.profileConfig || {}} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
