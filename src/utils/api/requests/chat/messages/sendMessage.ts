import { v4 as uuidv4 } from 'uuid'

import { supabase } from '@/lib/supabase/client'

export interface sendMessageRequest {
	message: string
	channelId: string
	userId: string
}
export const sendMessage = async (props: sendMessageRequest) => {
	try {
		const { data } = await supabase
			.from('messages')
			.insert([
				{ id: uuidv4(), message: props.message, channel_id: props.channelId, user_id: props.userId }
			])
			.select()
			.single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
