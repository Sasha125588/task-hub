import { v4 as uuidv4 } from 'uuid'

import type { sendMessageRequest } from '@/utils/api/hooks/chat/usePostSendMessage'

import { supabase } from '@/lib/supabase/client'

export const sendMessage = async (props: sendMessageRequest) => {
	try {
		const { data } = await supabase
			.from('messages')
			.insert([
				{ id: uuidv4(), message: props.message, channel_id: props.channelId, user_id: props.userId }
			])
			.select()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
