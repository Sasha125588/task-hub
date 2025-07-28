import type { DBSubTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export const updateSubTask = async ({ id, params }: { id: string; params: Partial<DBSubTask> }) => {
	try {
		const { data: updatedSubTask, error: updateError } = await supabase
			.from('sub_tasks')
			.update(params)
			.match({ id })
			.select('*')
			.single()

		if (updateError) throw updateError

		if ('completed' in params && updatedSubTask) {
			const { data: allSubTasks, error: fetchError } = await supabase
				.from('sub_tasks')
				.select('*')
				.eq('task_id', updatedSubTask.task_id)

			if (fetchError) throw fetchError

			if (allSubTasks) {
				const completedTasks = allSubTasks.filter(task => task.completed).length
				const progress = Math.round((completedTasks * 100) / allSubTasks.length)

				const { error: progressError } = await supabase
					.from('tasks')
					.update({ progress })
					.match({ id: updatedSubTask.task_id })

				if (progressError) throw progressError
			}
		}

		return updatedSubTask
	} catch (error) {
		console.error('Error updating subtask:', error)
		throw error
	}
}
