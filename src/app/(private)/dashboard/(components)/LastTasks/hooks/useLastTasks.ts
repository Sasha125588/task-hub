'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import type { DBTask } from '@/types/db.types'
import { SortFilter, StatusFilter, type TSortFilter, type TStatusFilter } from '@/types/sort.types'

import { useGetTasksQuery } from '@/utils/api'

import { TASK_CONFIG } from '@/configs/task.config'

const SORT_TYPE = TASK_CONFIG.STORAGE_KEYS.SORT_TYPE
const STATUS_TYPE = TASK_CONFIG.STORAGE_KEYS.STATUS_TYPE

export const useLastTasks = (initialTasks: DBTask[]) => {
	const [statusType, setStatusType] = useQueryState<TStatusFilter>(
		STATUS_TYPE,
		parseAsStringLiteral(StatusFilter).withDefault('all')
	)

	const [sortType, setSortType] = useQueryState<TSortFilter>(
		SORT_TYPE,
		parseAsStringLiteral(SortFilter).withDefault('asc')
	)

	const { data: tasks = [] } = useGetTasksQuery(
		{
			status: statusType === 'all' ? undefined : statusType,
			sort_by: 'due_date',
			sort_type: sortType,
			limit: TASK_CONFIG.DISPLAYED_TASKS_LIMIT.toString()
		},
		initialTasks
	)

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
