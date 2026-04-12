'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function uploadPhotoToSeriesAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const seriesId = formData.get('seriesId') as string
  if (!seriesId) return { success: false, error: 'No series ID provided' }

  const series = await prisma.photoSeries.findUnique({ where: { id: seriesId } })
  if (!series || series.userId !== user.id) return { success: false, error: 'Series not found or unauthorized' }

  const file = formData.get('file') as File
  if (!file) return { success: false, error: 'No file provided' }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
  const filePath = `series_photos/${seriesId}/${fileName}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('portfolio-images')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (uploadError) {
    return { success: false, error: uploadError.message }
  }

  const { data: { publicUrl } } = supabaseAdmin.storage.from('portfolio-images').getPublicUrl(filePath)

  const aperture = formData.get('aperture') as string | null
  const shutterSpeed = formData.get('shutterSpeed') as string | null
  const focalLength = formData.get('focalLength') as string | null
  const iso = formData.get('iso') as string | null

  await prisma.photo.create({
    data: {
      url: publicUrl,
      seriesId,
      aperture,
      shutterSpeed,
      focalLength,
      iso,
    }
  })

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) return { success: false, error: 'User not found in DB' }

  revalidatePath(`/dashboard/photos/${seriesId}`)
  revalidatePath(`/${dbUser.username}/photos`)
  return { success: true }
}
