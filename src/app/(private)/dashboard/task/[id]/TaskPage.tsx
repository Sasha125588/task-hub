'use client'

import type { DBSubTask } from '@/types/db.types'

import { getNumOfSubTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'

import { Statistics } from '@/app/(private)/dashboard/task/[id]/(components)/Statistics/Statistics'
import { SubTasksList } from '@/app/(private)/dashboard/task/[id]/(components)/SubTasksList/SubTasksList'

export function TaskPage({ taskId, subTasks }: { taskId: string; subTasks: DBSubTask[] }) {
	const statistics = getNumOfSubTasksByStatus(subTasks ?? [])

	return (
		<div className='flex flex-col gap-4'>
			<Statistics statistics={statistics} />
			<SubTasksList
				id={taskId}
				subTasks={subTasks ?? []}
			/>
		</div>
	)
}
