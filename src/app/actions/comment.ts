"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { createClient } from '@/lib/supabase/server'

export async function createCommentAction(targetId: string, type: 'artwork' | 'photoSeries', text: string, parentId?: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, message: "You must be signed in to comment." }
    }

    if (!text || text.trim().length === 0) {
      return { success: false, message: "Comment cannot be empty." }
    }

    if (text.length > 2000) {
      return { success: false, message: "Comment must be under 2000 characters." }
    }

    const data: any = {
      text: text.trim(),
      userId: user.id,
      parentId: parentId || null
    }

    if (type === 'artwork') {
      data.artworkId = targetId
    } else {
      data.photoSeriesId = targetId
    }

    const newComment = await prisma.comment.create({ data })

    // Log Activity
    try {
      let targetUserId = ""
      if (type === 'artwork') {
        const asset = await prisma.artwork.findUnique({ where: { id: targetId }, select: { userId: true } })
        targetUserId = asset?.userId || ""
      } else {
        const asset = await prisma.photoSeries.findUnique({ where: { id: targetId }, select: { userId: true } })
        targetUserId = asset?.userId || ""
      }

      if (targetUserId && targetUserId !== user.id) {
        await prisma.activity.create({
          data: {
            type: 'COMMENT',
            actorId: user.id,
            targetId: targetUserId,
            commentId: newComment.id,
            artworkId: type === 'artwork' ? targetId : null,
            seriesId: type === 'photoSeries' ? targetId : null,
          }
        })
      }
    } catch (err) {}

    revalidatePath('/[username]/[type]/[id]', 'page')

    return { success: true }
  } catch (error: any) {
    console.error("Comment creation error:", error)
    return { success: false, message: error.message }
  }
}

export async function deleteCommentAction(commentId: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: "Unauthorized." }
    }

    // Ownership check
    const comment = await prisma.comment.findUnique({ where: { id: commentId } })
    if (!comment || comment.userId !== user.id) {
      return { success: false, message: "You can only delete your own comments." }
    }

    await prisma.comment.delete({ where: { id: commentId } })

    revalidatePath('/[username]/[type]/[id]', 'page')

    return { success: true }
  } catch (error: any) {
    console.error("Comment deletion error:", error)
    return { success: false, message: error.message }
  }
}
