'use server'

import { createClientServer } from '@/lib/supabase/server'

export const getTasksServer = async () => {
	const supabaseServer = createClientServer()

	try {
		const { data, error } = await (await supabaseServer)
			.from('tasks')
			.select('*')
			.order('due_date', { ascending: true })

		if (error) throw error
		return data
	} catch (error) {
		console.error('Error fetching tasks:', error)
		throw error
	}
}
