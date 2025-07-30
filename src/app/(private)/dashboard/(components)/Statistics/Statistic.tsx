'use client'

import type { DBTask } from '@/types/db.types'

import { useGetTasksStatisticsMutation } from '@/utils/api'

import { StatisticsChart } from './components/StatisticsChart/StatisticsChart'
import { StatisticsCards } from '@/app/(private)/dashboard/(components)/Statistics/components/StatisticsCards/StatisticsCards'

export function Statistic({ initialTasks }: { initialTasks: DBTask[] }) {
	const { data: tasksStatistics } = useGetTasksStatisticsMutation(initialTasks)

	return (
		<div className='flex h-[450px] gap-5'>
			<StatisticsCards tasks={tasksStatistics} />
			<div className='h-full flex-1'>
				<StatisticsChart tasks={tasksStatistics} />
			</div>
		</div>
	)
}
