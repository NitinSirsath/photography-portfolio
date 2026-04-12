'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ProfileConfig, SocialLinks } from '@/types/profile'

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!dbUser) return { success: false, error: 'User not found' }

  const displayName = formData.get('displayName') as string | null
  const bio = formData.get('bio') as string | null
  
  // Profile Config
  const accentColor = formData.get('accentColor') as string | null
  const backgroundColor = formData.get('backgroundColor') as string | null
  const textColor = formData.get('textColor') as string | null
  const fontFamily = formData.get('fontFamily') as 'serif' | 'sans-serif' | 'monospace' | null
  const logoText = formData.get('logoText') as string | null
  const isAvailableForHire = formData.get('isAvailableForHire') === 'on'
  
  // Avatar upload URL if implemented, else text field for simplicity in this phase
  const avatarUrl = formData.get('avatarUrl') as string | null
  
  // Social Links
  const twitter = formData.get('twitter') as string | null
  const instagram = formData.get('instagram') as string | null
  const behance = formData.get('behance') as string | null
  const website = formData.get('website') as string | null

  // Support Links
  const tipJarUrl = formData.get('tipJarUrl') as string | null

  const existingConfig = (dbUser.profileConfig as Record<string, any>) || {}
  const newConfig: ProfileConfig = {
    ...existingConfig,
    ...(accentColor && { accentColor }),
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { textColor }),
    ...(fontFamily && { fontFamily }),
    ...(logoText && { logoText }),
  }

  const existingLinks = (dbUser.socialLinks as Record<string, any>) || {}
  const newLinks: SocialLinks = {
    ...existingLinks,
    ...(twitter && { twitter }),
    ...(instagram && { instagram }),
    ...(behance && { behance }),
    ...(website && { website }),
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(displayName !== null && { displayName }),
      ...(bio !== null && { bio }),
      ...(avatarUrl !== null && { avatarUrl }),
      isAvailableForHire,
      tipJarUrl,
      profileConfig: newConfig as any,
      socialLinks: newLinks as any,
    }
  })

  revalidatePath(`/${dbUser.username}/home`)
  revalidatePath(`/${dbUser.username}/about`)
  revalidatePath(`/${dbUser.username}/settings`)
  revalidatePath('/dashboard/settings')

  return { success: true }
}
