'use client'

import { useUnit } from 'effector-react'

import { Card } from '@/components/ui/card'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'
import { getCurrentTimePosition } from './components/TodayTasksTimeline/helpers'
import { $tasks } from '@/stores/task/store'

export function TodayTasks() {
	const tasks = useUnit($tasks)
	const todayTasks = tasks.filter(
		task =>
			task.startTime &&
			task.endTime &&
			task.dueDate.toDateString() === new Date().toDateString()
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
