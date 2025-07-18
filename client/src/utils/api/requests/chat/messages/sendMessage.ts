import { supabase } from '@/lib/supabase/client'

export const sendMessage = async (message: string, channel_id: number, user_id: string) => {
	try {
		const { data } = await supabase
			.from('messages')
			.insert([{ message, channel_id, user_id }])
			.select()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
