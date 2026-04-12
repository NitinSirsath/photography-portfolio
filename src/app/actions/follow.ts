'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleFollowAction(targetUserId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const currentUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!currentUser) return { success: false, error: 'User not found' }

  if (currentUser.id === targetUserId) {
    return { success: false, error: 'Cannot follow yourself' }
  }

  const existingFollow = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: targetUserId
      }
    }
  })

  let isFollowing = false

  if (existingFollow) {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId
        }
      }
    })
    isFollowing = false
  } else {
    await prisma.follows.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUserId
      }
    })
    isFollowing = true

    // Log Activity
    try {
      await prisma.activity.create({
        data: {
          type: 'FOLLOW',
          actorId: currentUser.id,
          targetId: targetUserId
        }
      })
    } catch (err) {}
  }

  revalidatePath('/community')
  revalidatePath('/[username]/home', 'page') // We will try to revalidate the user's home specifically where possible

  return { success: true, isFollowing }
}
