import type { DBSubTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export const updateSubTask = async ({ id, params }: { id: string; params: Partial<DBSubTask> }) => {
	try {
		const { data } = await supabase.from('sub_tasks').update(params).match({ id }).single()
		return data
	} catch (error) {
		console.error('Error updating subtask:', error)
		throw error
	}
}
