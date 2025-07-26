import supabase from '@/lib/supabase/client'

export const getMessages = async (channelId: string) => {
	try {
		const { data } = await supabase
			.from('messages')
			.select(`*`)
			.eq('channel_id', channelId)
			.order('inserted_at', { ascending: true })
		return data
	} catch (error) {
		console.log('error', error)
	}
}
