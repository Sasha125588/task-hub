'use client'

import { useUnit } from 'effector-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { Tabs } from '@/components/animate-ui/radix/tabs'

import { StatusFilter, type TStatusFilter, type TaskStatuses } from '@/types/task.types'

import { useGetAllTasksQuery } from '@/utils/api'

import { LastTasksContent } from './components/LastTasksContent/LastTasksContent'
import { LastTasksHeader } from './components/LastTasksHeader/LastTasksHeader'
import { TASK_CONFIG } from '@/configs/task.config'
import { $sortType } from '@/stores/task/sort-type'
import { $statusType, statusTypeUpdated as updateStatusType } from '@/stores/task/status-type'

export function LastTasks() {
	const statusType = useUnit($statusType)
	const sortType = useUnit($sortType)
	const { data } = useGetAllTasksQuery({
		status: statusType === 'all' ? undefined : statusType,
		sort_by: 'due_date',
		sort_type: sortType,
		limit: TASK_CONFIG.DISPLAYED_TASKS_LIMIT.toString()
	})

	const [, setUrlStatus] = useQueryState<TStatusFilter>(
		'status',
		parseAsStringLiteral(StatusFilter).withDefault('all')
	)

	const changeStatusType = (value: string) => {
		const newType = value as TaskStatuses
		setUrlStatus(newType)
		updateStatusType(newType)
	}

	return (
		<Tabs
			defaultValue={statusType}
			dir='rtl'
			onValueChange={changeStatusType}
		>
			<LastTasksHeader tasks={data ?? []} />
			<LastTasksContent tasks={data ?? []} />
		</Tabs>
	)
}
