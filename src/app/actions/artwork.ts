"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase"
import crypto from 'crypto'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createArtworkAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const aspectRatio = formData.get("aspectRatio") as string
    const colSpan = formData.get("colSpan") as string
    const tagsString = formData.get("tags") as string
    const image = formData.get("image") as File

    if (!title || !description || !image || image.size === 0) {
      throw new Error("Missing required fields or image is empty")
    }

    // Authenticate the user
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {},
        },
      }
    )
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized: Identity Verification Failed")

    // 1. Storage Upload Sequence
    const fileExt = image.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}-${Date.now()}.${fileExt}`
    
    // We must intercept the standard DOM File signature and encode it as a raw buffer
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: storageError } = await supabaseAdmin
      .storage
      .from('portfolio-images')
      .upload(`artworks/${fileName}`, buffer, {
        contentType: image.type,
      })

    if (storageError) {
      console.error("Supabase SDK Error:", storageError)
      throw new Error("Failed to upload image into Cloud Storage")
    }

    // 2. Resolve Public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('portfolio-images')
      .getPublicUrl(`artworks/${fileName}`)

    // 3. Destructure and Sanitize Arrays
    const tags = tagsString ? tagsString.split(',').map(t => t.trim().toUpperCase()).filter(Boolean) : []

    // 4. Prisma ORM: Write to Postgres
    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        aspectRatio: aspectRatio || 'aspect-square',
        colSpan: colSpan || 'md:col-span-1',
        tags,
        imageUrl: publicUrl,
        isPublished: true,
        userId: user.id
      }
    })

    // 5. Cloud Revalidation Edge Triggers
    revalidatePath('/artworks')

    return { success: true }
    
  } catch (error: any) {
    console.error("Architecture Server Error:", error)
    return { success: false, message: error.message || "An unknown server error occurred" }
  }
}
