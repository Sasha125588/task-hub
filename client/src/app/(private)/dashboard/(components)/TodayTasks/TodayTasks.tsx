'use client'

import { Card } from '@/components/ui/card'

import { useGetAllTasks } from '@/utils/api'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'
import { getCurrentTimePosition } from './components/TodayTasksTimeline/helpers'

export function TodayTasks() {
	const tasks = useGetAllTasks().data?.tasks || []
	const todayTasks = tasks?.filter(
		task =>
			task?.start_time &&
			task?.end_time &&
			new Date(task?.due_date).toDateString() === new Date().toDateString()
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
