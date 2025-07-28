'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { Tabs } from '@/components/animate-ui/radix/tabs'

import type { DBTask } from '@/types/db.types'
import { StatusFilter, type TStatusFilter, type TaskStatuses } from '@/types/task.types'

import { LastTasksContent } from './components/LastTasksContent/LastTasksContent'
import { LastTasksHeader } from './components/LastTasksHeader/LastTasksHeader'

export function LastTasks({ tasks, statusType }: { tasks: DBTask[]; statusType: TaskStatuses }) {
	const [, setStatus] = useQueryState<TStatusFilter>(
		'status',
		parseAsStringLiteral(StatusFilter).withDefault('all')
	)

	const changeStatusType = (value: string) => {
		const newType = value as TaskStatuses
		setStatus(newType)
	}

	return (
		<Tabs
			defaultValue={statusType}
			dir='rtl'
			onValueChange={changeStatusType}
		>
			<div className='flex flex-col gap-3'>
				<LastTasksHeader tasks={tasks} />
				<LastTasksContent tasks={tasks} />
			</div>
		</Tabs>
	)
}
