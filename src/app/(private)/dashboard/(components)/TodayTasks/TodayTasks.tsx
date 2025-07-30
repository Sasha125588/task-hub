'use client'

import { useMemo } from 'react'

import { Card } from '@/components/ui/card'

import type { DBTask } from '@/types/db.types'

import { useGetTasksStatisticsMutation } from '@/utils/api'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'

export function TodayTasks({ initialTasks }: { initialTasks: DBTask[] }) {
	const { data: tasksStatistics } = useGetTasksStatisticsMutation(initialTasks)

	const todayTasks = useMemo(() => {
		const today = new Date().toISOString().split('T')[0]
		return tasksStatistics?.filter(task => {
			return task.due_date.split('T')[0] === today
		})
	}, [tasksStatistics])

	return (
		<Card className='p-6'>
			<TodayTasksHeader tasks={todayTasks ?? []} />
			<TodayTasksTimeline tasks={todayTasks ?? []} />
		</Card>
	)
}
