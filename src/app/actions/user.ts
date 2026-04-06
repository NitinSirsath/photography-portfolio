"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { createClient } from '@/lib/supabase/server'

export async function updateProfileAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error("Unauthorized Access")

    const displayName = formData.get("displayName") as string
    const bio = formData.get("bio") as string
    const accentColor = formData.get("accentColor") as string

    // 1. Gather existing config to safely update the JSON blob
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (!dbUser) throw new Error("User record not found in Postgres")

    const currentConfig = (dbUser.profileConfig as Record<string, any>) || {}
    const updatedConfig = {
      ...currentConfig,
      accentColor: accentColor || currentConfig.accentColor || "#a6e22e",
    }

    // 2. Execute authoritative write to Postgres
    await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName,
        bio,
        profileConfig: updatedConfig
      }
    })

    // 3. Purge dynamic cache for their vanity route
    revalidatePath(`/${dbUser.username}`)
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error: any) {
    console.error("Profile Update Error:", error)
    return { success: false, message: error.message }
  }
}
