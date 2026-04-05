"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase"
import crypto from 'crypto'

export async function createPhotoSeriesAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("coverImage") as File

    if (!title || !description || !image || image.size === 0) {
      throw new Error("Missing required fields or cover image is empty")
    }

    // 1. Upload Cover Image to Supabase Storage
    const fileExt = image.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}-${Date.now()}.${fileExt}`
    
    // Intercept File and convert to raw buffer for Node.js
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: storageError } = await supabaseAdmin
      .storage
      .from('portfolio-images')
      .upload(`series/${fileName}`, buffer, {
        contentType: image.type,
      })

    if (storageError) {
      console.error("Supabase SDK Error:", storageError)
      throw new Error("Failed to upload cover image into Cloud Storage")
    }

    // 2. Resolve Public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('portfolio-images')
      .getPublicUrl(`series/${fileName}`)

    // 3. Save to Postgres via Prisma
    const newSeries = await prisma.photoSeries.create({
      data: {
        title,
        description,
        coverImage: publicUrl,
        isPublished: true,
      }
    })

    // 4. Invalidate the photography frontend cache
    revalidatePath('/photos')

    return { success: true }
    
  } catch (error: any) {
    console.error("Architecture Server Error:", error)
    return { success: false, message: error.message || "An unknown server error occurred" }
  }
}
