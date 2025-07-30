import type { DBSubTask } from '@/types/db.types'

import { getSubTasks } from '@/utils/api/requests/task/sub-task/getSubTasks'
import { getTaskStatusByProgress } from '@/utils/helpers/task/getTaskStatusByProgress'

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
			const allSubTasks = await getSubTasks(updatedSubTask.task_id)

			if (allSubTasks) {
				const completedTasks = allSubTasks.filter(task => task.completed).length
				const progress = Math.round((completedTasks * 100) / allSubTasks.length)

				const status = getTaskStatusByProgress(progress)

				const taskUpdates: { progress: number; status?: string } = { progress }

				if (status) {
					taskUpdates.status = status
				}

				await supabase.from('tasks').update(taskUpdates).match({ id: updatedSubTask.task_id })
			}
		}

		return updatedSubTask
	} catch (error) {
		console.error('Error updating subtask:', error)
		throw error
	}
}
