import { v4 as uuidv4 } from 'uuid'

import supabase from '@/lib/supabase/client'

export const createChannel = async (slug: string, user_id: string) => {
	try {
		const { data: existingChannel } = await supabase
			.from('channels')
			.select('id')
			.eq('slug', slug)
			.single()

		if (existingChannel) {
			throw new Error('Channel with this name already exists')
		}

		const { data } = await supabase
			.from('channels')
			.insert([{ id: uuidv4(), created_at: new Date().toISOString(), slug, created_by: user_id }])
			.select()
			.single()
		return data
	} catch (error) {
		console.error('error', error)
		throw error
	}
}
