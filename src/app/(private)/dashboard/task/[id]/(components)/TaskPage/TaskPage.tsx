'use client'

import { format } from 'date-fns'
import { CalendarDays, Clock } from 'lucide-react'

import { IconDisplay } from '@/components/common/IconPicker'
import { Card, CardContent } from '@/components/ui/card'

import { useGetSubTasksQuery, useGetTaskByIdQuery } from '@/utils/api/hooks/task'
import { getNumOfSubTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'

import { Statistics } from './components/Statistics/Statistics'
import { SubTasksList } from './components/SubTasksList/SubTasksList'

export function TaskPage({ taskId }: { taskId: string }) {
	const { data: subTasks } = useGetSubTasksQuery(taskId)
	const { data: task } = useGetTaskByIdQuery(taskId)

	const statistics = getNumOfSubTasksByStatus(subTasks ?? [])

	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardContent className='flex items-center gap-4'>
					<div className='bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg'>
						<IconDisplay iconName={task?.icon_name} />
					</div>

					<div className='flex flex-1 flex-col gap-3'>
						<h1 className='text-foreground/90 text-2xl font-semibold'>{task?.title}</h1>

						<div className='text-muted-foreground flex flex-wrap items-center gap-4 text-sm'>
							<div className='flex items-center gap-1.5'>
								<CalendarDays
									size={16}
									className='opacity-70'
								/>
								<span>
									Created {format(new Date(task?.created_at ?? new Date()), 'MMM dd, yyyy')}
								</span>
							</div>
							{task?.due_date && (
								<div className='flex items-center gap-1.5'>
									<Clock
										size={16}
										className='opacity-70'
									/>
									<span>Due {format(new Date(task?.due_date), 'MMM dd, yyyy')}</span>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Statistics statistics={statistics} />
			<SubTasksList
				id={taskId}
				subTasks={subTasks ?? []}
			/>
		</div>
	)
}
