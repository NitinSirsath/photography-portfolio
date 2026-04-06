"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { createClient } from '@/lib/supabase/server'

export async function toggleAppreciationAction(targetId: string, type: 'artwork' | 'photoSeries') {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, message: "Unauthorized. Must be synchronized to appreciate." }
    }

    // Determine target payload
    const whereCondition = type === 'artwork' 
      ? { userId_artworkId: { userId: user.id, artworkId: targetId } }
      : { userId_photoSeriesId: { userId: user.id, photoSeriesId: targetId } }

    const dataPayload = type === 'artwork'
      ? { userId: user.id, artworkId: targetId }
      : { userId: user.id, photoSeriesId: targetId }

    // 1. Check if the appreciation already exists
    const existingAppreciation = await prisma.like.findUnique({
      where: whereCondition as any
    })

    if (existingAppreciation) {
      // Retract the appreciation
      await prisma.like.delete({
        where: { id: existingAppreciation.id }
      })
    } else {
      // Issue a new appreciation
      await prisma.like.create({
        data: dataPayload as any
      })
    }

    // 2. Revalidate platform paths
    revalidatePath('/')
    revalidatePath('/[username]', 'page')

    return { success: true, appreciated: !existingAppreciation }

  } catch (error: any) {
    console.error("Appreciation Matrix Error:", error)
    return { success: false, message: error.message }
  }
}
