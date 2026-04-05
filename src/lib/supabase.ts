import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// We use the Service Role Key here exclusively because this client 
// will ONLY be used inside our secure Next.js Server Actions (Backend).
// This allows us to upload files to the bucket without dealing with Row Level Security.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
