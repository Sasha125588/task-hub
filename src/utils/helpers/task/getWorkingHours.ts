import type { DBTask } from '@/types/db.types'

const parseTimeString = (timeStr: string | null): Date | null => {
	if (!timeStr) return null

	const [hours, minutes] = timeStr.split(':').map(Number)
	const date = new Date()
	date.setHours(hours, minutes, 0, 0)
	return date
}

export const getWorkingHours = (tasks: DBTask[]) => {
	return tasks.reduce((totalHours, task) => {
		const startDate = parseTimeString(task.start_time)
		if (!startDate) return totalHours

		const endDate = task.end_time ? parseTimeString(task.end_time) : new Date()
		if (!endDate) return totalHours

		const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
		return totalHours + Math.round(hours * 10) / 10
	}, 0)
}
