import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * Same client setup as the main FRFM app. Null when the environment
 * variables are missing, so the page still renders in a plain preview.
 */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null

if (!supabase && import.meta.env.DEV) {
  console.warn('Supabase is not configured: copy .env.example to .env.local and fill in the values.')
}
