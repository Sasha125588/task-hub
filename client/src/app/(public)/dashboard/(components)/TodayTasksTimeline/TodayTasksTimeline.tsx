'use client'

import { useUnit } from 'effector-react'

import { Card } from '@/components/ui/card'

import { TimelineTasks } from './components/TimelineTasks'
import { TodayTasksHeader } from './components/TodayTasksHeader'
import { getCurrentTimePosition } from './helpers'
import { $tasks } from '@/stores/task/store'

export function TodayTasksTimeline() {
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
			<TimelineTasks
				tasks={todayTasks}
				currentTimePosition={currentTimePosition}
			/>
		</Card>
	)
}
