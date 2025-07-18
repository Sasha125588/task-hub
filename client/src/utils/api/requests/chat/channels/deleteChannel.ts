import { supabase } from '@/lib/supabase/client'

export const deleteChannel = async (channel_id: number) => {
	try {
		const { data } = await supabase.from('channels').delete().match({ id: channel_id })
		return data
	} catch (error) {
		console.log('error', error)
	}
}
