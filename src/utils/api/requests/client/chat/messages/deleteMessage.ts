import supabase from '@/lib/supabase/client'

export const deleteMessage = async (message_id: string) => {
	try {
		const { data } = await supabase.from('messages').delete().match({ id: message_id }).single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
