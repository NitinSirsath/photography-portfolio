import prisma from '@/lib/prisma'
import { ArtworksGrid } from '@/components/ui/ArtworksGrid'

// By removing "use client" this becomes a blazing fast Server Component
// that physically runs on the actual server, querying postgres directly!
export const revalidate = 0 // Disable cache for dev clarity, or use exact caching rules.

export default async function ArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  })

  // We simply pass the raw JSON data downwards into the interactive Client Grid
  return <ArtworksGrid artworks={artworks} />
}
