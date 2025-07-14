import { Suspense } from 'react'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from '@/app/(public)/dashboard/(components)/Statistics/Statistic'
import { TodayTasksTimeline } from '@/app/(public)/dashboard/(components)/TodayTasksTimeline/TodayTasksTimeline'

export default function DashboardPage() {
	return (
		<Suspense fallback={<>Loading dashboard page</>}>
			<div className='flex w-full flex-col gap-7'>
				<Statistic />
				<LastTasks />
				<TodayTasksTimeline />
			</div>
		</Suspense>
	)
}
