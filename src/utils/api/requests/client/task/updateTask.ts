import type { DBTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export const updateTask = async ({ id, params }: { id: string; params: Partial<DBTask> }) => {
	try {
		const { data } = await supabase.from('tasks').update(params).match({ id }).single()
		return data
	} catch (error) {
		console.error('Error updating task:', error)
		throw error
	}
}
