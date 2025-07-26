'use client'

import { useUnit } from 'effector-react'
import { Suspense } from 'react'

import type { TaskStatuses } from '@/types/task.types'

import { useGetAllTasksQuery } from '@/utils/api'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from './(components)/Statistics/Statistic'
import { TodayTasks } from './(components)/TodayTasks/TodayTasks'
import { TASK_CONFIG } from '@/configs/task.config'
import { $sortType } from '@/stores/task/sort-type'
import { $statusType } from '@/stores/task/status-type'

export default function DashboardPage() {
	const statusType = useUnit($statusType)
	const sortType = useUnit($sortType)

	const tasks =
		useGetAllTasksQuery({
			status: statusType === 'all' ? undefined : statusType,
			sort_by: 'due_date',
			sort_type: sortType,
			limit: TASK_CONFIG.DISPLAYED_TASKS_LIMIT.toString()
		}).data ?? []

	return (
		<Suspense fallback={<>Loading dashboard page</>}>
			<div className='flex w-full flex-col gap-7'>
				<Statistic tasks={tasks} />
				<LastTasks
					tasks={tasks}
					statusType={statusType as TaskStatuses}
				/>
				<TodayTasks tasks={tasks} />
			</div>
		</Suspense>
	)
}
