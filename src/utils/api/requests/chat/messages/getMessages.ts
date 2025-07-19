import type { ChatMessage } from '@/types/chat.types'

import { supabase } from '@/lib/supabase/client'

export const getMessages = async (
	channelId: string,
	setState?: (messages: ChatMessage[]) => void
) => {
	try {
		const { data } = await supabase
			.from('messages')
			.select(`*, author:user_id(*)`)
			.eq('channel_id', channelId)
			.order('inserted_at', { ascending: true })
		if (setState) setState(data || [])
		return data
	} catch (error) {
		console.log('error', error)
	}
}
