import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'


export const createChannel = async (slug: string, user_id: string) => {
	const supabase = createClient()
	try {
		const { data } = await supabase
			.from('channels')
			.insert([{ id: uuidv4(), slug, created_by: user_id }])
			.select()
			.single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
