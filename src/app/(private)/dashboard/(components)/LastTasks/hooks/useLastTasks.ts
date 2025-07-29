'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { SortFilter, StatusFilter, type TSortFilter, type TStatusFilter } from '@/types/task.types'

import { useGetTasksQuery } from '@/utils/api'

import { TASK_CONFIG } from '@/configs/task.config'

export const useLastTasks = () => {
	const [statusType, setStatusType] = useQueryState<TStatusFilter>(
		'status',
		parseAsStringLiteral(StatusFilter).withDefault('all')
	)

	const [sortType, setSortType] = useQueryState<TSortFilter>(
		'sort',
		parseAsStringLiteral(SortFilter).withDefault('asc')
	)

	const { data: tasks = [] } = useGetTasksQuery({
		status: statusType === 'all' ? undefined : statusType,
		sort_by: 'due_date',
		sort_type: sortType,
		limit: TASK_CONFIG.DISPLAYED_TASKS_LIMIT.toString()
	})

	return {
		state: {
			tasks,
			statusType,
			sortType
		},
		functions: {
			setStatusType,
			setSortType
		}
	}
}
