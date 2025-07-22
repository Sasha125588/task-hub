import { supabase } from '@/lib/supabase/client'

export const getChannels = async () => {
	try {
		const { data } = await supabase.from('channels').select('*')
		return data
	} catch (error) {
		console.log('error', error)
	}
}
