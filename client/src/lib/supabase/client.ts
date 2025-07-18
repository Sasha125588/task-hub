import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY!
	)
}

export const supabase = createClient()
