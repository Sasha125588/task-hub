'use client'

import type { DBTask } from '@/types/db.types'

import { StatisticsChart } from './components/StatisticsChart/StatisticsChart'
import { StatisticsCards } from '@/app/(private)/dashboard/(components)/Statistics/components/StatisticsCards/StatisticsCards'

export function Statistic({ statisticsTasks }: { statisticsTasks: DBTask[] }) {
	return (
		<div className='flex h-[450px] gap-5'>
			<StatisticsCards tasks={statisticsTasks} />
			<div className='h-full flex-1'>
				<StatisticsChart tasks={statisticsTasks} />
			</div>
		</div>
	)
}
