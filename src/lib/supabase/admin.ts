import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// SERVER-SIDE ONLY: Never import in client components
export function createAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const secretKey = process.env.SUPABASE_SECRET_KEY || 'placeholder-secret'

  if (!secretKey || secretKey === 'placeholder-secret') {
    console.warn('SUPABASE_SECRET_KEY is not configured. Admin client running in fallback mode.')
  }

  return createSupabaseClient<Database>(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

