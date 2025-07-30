'use client'

import { useMemo } from 'react'

import { Card } from '@/components/ui/card'

import type { DBTask } from '@/types/db.types'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'

export function TodayTasks({ statisticsTasks }: { statisticsTasks: DBTask[] }) {
	const todayTasks = useMemo(() => {
		const today = new Date().toISOString().split('T')[0]
		return statisticsTasks.filter(task => {
			return task.due_date.split('T')[0] === today
		})
	}, [statisticsTasks])

	return (
		<Card className='p-6'>
			<TodayTasksHeader tasks={todayTasks} />
			<TodayTasksTimeline tasks={todayTasks} />
		</Card>
	)
}
