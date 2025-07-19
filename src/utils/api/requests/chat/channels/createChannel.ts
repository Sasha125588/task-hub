import { v4 as uuidv4 } from 'uuid'

import { supabase } from '@/lib/supabase/client'

export const createChannel = async (slug: string, user_id: string) => {
	try {
		const { data } = await supabase
			.from('channels')
			.insert([{ id: uuidv4(), slug, created_by: user_id }])
			.select()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
