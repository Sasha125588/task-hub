'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import {
	SortFilter,
	StatusFilter,
	type TSortFilter,
	type TStatusFilter,
	type TaskStatuses
} from '@/types/task.types'

import { useGetAllTasksQuery } from '@/utils/api'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from './(components)/Statistics/Statistic'
import { TodayTasks } from './(components)/TodayTasks/TodayTasks'
import { TASK_CONFIG } from '@/configs/task.config'

export default function DashboardPage() {
	const [statusType] = useQueryState<TStatusFilter>(
		'status',
		parseAsStringLiteral(StatusFilter).withDefault('all')
	)

	const [sortType] = useQueryState<TSortFilter>(
		'sort',
		parseAsStringLiteral(SortFilter).withDefault('asc')
	)

	const tasks =
		useGetAllTasksQuery({
			status: statusType === 'all' ? undefined : statusType,
			sort_by: 'due_date',
			sort_type: sortType,
			limit: TASK_CONFIG.DISPLAYED_TASKS_LIMIT.toString()
		}).data ?? []

	return (
		<div className='flex w-full flex-col gap-7'>
			<Statistic tasks={tasks} />
			<LastTasks
				tasks={tasks}
				statusType={statusType as TaskStatuses}
			/>
			<TodayTasks tasks={tasks} />
		</div>
	)
}
