import type { ModelsTask } from '../../../../generated/api'

export const getNumOfTasksByStatus = (tasks: ModelsTask[]) => {
	const stats = {
		all: tasks.length,
		completed: 0,
		'in-progress': 0,
		'not-started': 0
	}

	tasks.forEach(task => stats[task.status]++)

	return stats
}
