import { Suspense } from 'react'

import { TaskList } from '@/components/pages/dashboard/last-tasks/TaskList'
import { Statistic } from '@/components/pages/dashboard/statistics/Statistic'
import { TodayTasksTimeline } from '@/components/pages/dashboard/statistics/TodayTasksTimeline'

export default function DashboardPage() {
	return (
		<Suspense fallback={<>Loading dashboard page</>}>
			<div className='flex w-full flex-col gap-7'>
				<Statistic />
				<TaskList />
				<TodayTasksTimeline />
			</div>
		</Suspense>
	)
}
