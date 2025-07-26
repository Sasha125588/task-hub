'use client'

import { useGetSubTasksQuery } from '@/utils/api/hooks/task/useGetSubTasksQuery'
import { getNumOfSubTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'

import { Statistics } from '@/app/(private)/dashboard/task/[id]/(components)/Statistics/Statistics'
import { SubTasksList } from '@/app/(private)/dashboard/task/[id]/(components)/SubTasksList/SubTasksList'

export function TaskPage({ taskId }: { taskId: string }) {
	const { data: subTasks } = useGetSubTasksQuery(taskId)

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
