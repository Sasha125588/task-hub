'use client'

import { Card } from '@/components/ui/card'

import type { DBTask } from '@/types/db.types'

import { TodayTasksHeader } from './components/TodayTasksHeader/TodayTasksHeader'
import { TodayTasksTimeline } from './components/TodayTasksTimeline/TodayTasksTimeline'
import { getCurrentTimePosition } from './components/TodayTasksTimeline/helpers'

export function TodayTasks({ statisticsTasks }: { statisticsTasks: DBTask[] }) {
	const currentTimePosition = getCurrentTimePosition()

	return (
		<Card className='p-6'>
			<TodayTasksHeader tasks={statisticsTasks} />
			<TodayTasksTimeline
				tasks={statisticsTasks}
				currentTimePosition={currentTimePosition}
			/>
		</Card>
	)
}
