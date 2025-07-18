import { supabase } from '@/lib/supabase/client'

export const createChannel = async (slug: string, user_id: string) => {
	try {
		const { data } = await supabase
			.from('channels')
			.insert([{ slug, created_by: user_id }])
			.select()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
