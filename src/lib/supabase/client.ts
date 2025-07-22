import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../../../generated/database.types'

export function createClient() {
	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY!
	)
}

export const supabase = createClient()
