import type { Database } from '@generated/database.types'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () => createBrowserClient<Database>(supabaseUrl!, supabaseKey!)

const supabase = createClient()

export default supabase
