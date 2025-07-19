import type { ChatUser } from '@/types/chat.types'

import { supabase } from '@/lib/supabase/client'

export const getUser = async (userId: string, setState?: (user: ChatUser | undefined) => void) => {
	try {
		const { data } = await supabase.from('users').select(`*`).eq('id', userId)
		const user = data?.[0]
		if (setState) setState(user)
		return user
	} catch (error) {
		console.log('error', error)
	}
}
