'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { Tabs } from '@/components/animate-ui/radix/tabs'

import type { DBTask } from '@/types/db.types'
import { StatusFilter, type TStatusFilter, type TaskStatuses } from '@/types/task.types'

import { LastTasksContent } from './components/LastTasksContent/LastTasksContent'
import { LastTasksHeader } from './components/LastTasksHeader/LastTasksHeader'
import { statusTypeUpdated as updateStatusType } from '@/stores/task/status-type'

export function LastTasks({ tasks, statusType }: { tasks: DBTask[]; statusType: TaskStatuses }) {
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
			<LastTasksHeader tasks={tasks} />
			<LastTasksContent tasks={tasks} />
		</Tabs>
	)
}
