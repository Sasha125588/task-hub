'use client'

import { useGetTasksStatisticsMutation } from '@/utils/api'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from './(components)/Statistics/Statistic'
import { TodayTasks } from './(components)/TodayTasks/TodayTasks'

export default function DashboardPage() {
	const { data: tasksStatistics } = useGetTasksStatisticsMutation()

	return (
		<div className='flex w-full flex-col gap-7'>
			<Statistic statisticsTasks={tasksStatistics ?? []} />
			<LastTasks />
			<TodayTasks statisticsTasks={tasksStatistics ?? []} />
		</div>
	)
}
