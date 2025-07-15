import { Suspense } from 'react'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from '@/app/(public)/dashboard/(components)/Statistics/Statistic'
import { TodayTasks } from '@/app/(public)/dashboard/(components)/TodayTasks/TodayTasks'

export default function DashboardPage() {
	return (
		<Suspense fallback={<>Loading dashboard page</>}>
			<div className='flex w-full flex-col gap-7'>
				<Statistic />
				<LastTasks />
				<TodayTasks />
			</div>
		</Suspense>
	)
}
