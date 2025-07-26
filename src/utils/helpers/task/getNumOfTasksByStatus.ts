import type { DBSubTask, DBTask } from '@/types/db.types'

export const getNumOfTasksByStatus = (tasks: DBTask[]) => {
	const stats = {
		all: tasks.length,
		completed: 0,
		'in-progress': 0,
		'not-started': 0
	}

	tasks.forEach(task => {
		if (
			task.status === 'completed' ||
			task.status === 'in-progress' ||
			task.status === 'not-started'
		) {
			stats[task.status]++
		}
	})

	return stats
}

export const getNumOfSubTasksByStatus = (subTasks: DBSubTask[]) => {
	const stats = {
		all: subTasks.length,
		completed: 0,
		'not-started': 0
	}

	subTasks.forEach(subTask => {
		const status = subTask.completed === true ? 'completed' : 'not-started'
		stats[status]++
	})

	return stats
}
