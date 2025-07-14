'use client'

import { useUnit } from 'effector-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { Tabs } from '@/components/animate-ui/radix/tabs'

import {
	StatusFilter,
	type TStatusFilter,
	type TaskStatuses
} from '@/types/task.types'

import { TaskListContent } from './components/TaskListContent'
import { TaskListHeader } from './components/TaskListHeader'
import {
	$statusType,
	statusTypeUpdated as updateStatusType
} from '@/stores/task/store'

export function LastTasks() {
	const statusType = useUnit($statusType)

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
			<TaskListHeader />
			<TaskListContent />
		</Tabs>
	)
}
