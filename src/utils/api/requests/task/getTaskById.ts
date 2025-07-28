import supabase from '@/lib/supabase/client'

export const getTaskById = async (id: string) => {
	try {
		const { data: task } = await supabase.from('tasks').select('*').match({ id }).single()

		if (!task) return null

		const { data: subtasks } = await supabase.from('sub_tasks').select('*').match({ task_id: id })

		if (!subtasks) return task

		const totalSubtasks = subtasks.length
		const completedSubtasks = subtasks.filter(subtask => subtask.completed).length

		const progress = totalSubtasks === 0 ? 0 : Math.round((completedSubtasks / totalSubtasks) * 100)

		const { data: updatedTask } = await supabase
			.from('tasks')
			.update({ progress })
			.match({ id })
			.select()
			.single()

		return updatedTask || task
	} catch (error) {
		console.error('Error getting task:', error)
		throw error
	}
}
