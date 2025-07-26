'use client'

import { Card } from '@/components/ui/card'

import type { DBTask } from '@/types/db.types'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'
import { getCurrentTimePosition } from './components/TodayTasksTimeline/helpers'

export function TodayTasks({ tasks }: { tasks: DBTask[] }) {
	const todayTasks = tasks.filter(
		task =>
			task.start_time &&
			task.end_time &&
			new Date(task.due_date).toDateString() === new Date().toDateString()
	)
	const currentTimePosition = getCurrentTimePosition()

	return (
		<Card className='p-6'>
			<TodayTasksHeader tasks={todayTasks} />
			<TodayTasksTimeline
				tasks={todayTasks}
				currentTimePosition={currentTimePosition}
			/>
		</Card>
	)
}
