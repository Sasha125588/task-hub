import type { DBSubTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export const getSubTasks = async (taskId: string): Promise<DBSubTask[]> => {
	try {
		const { data, error } = await supabase
			.from('sub_tasks')
			.select('*')
			.eq('task_id', taskId)
			.order('order', { ascending: true })

		if (error) throw error
		return data || []
	} catch (error) {
		console.error('Error fetching sub-tasks:', error)
		throw error
	}
}
