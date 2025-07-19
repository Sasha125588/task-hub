import { useUnit } from 'effector-react'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { FlipButton as ChangeSortTypeButton } from '@/components/animate-ui/buttons/flip'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/components/animate-ui/radix/hover-card'
import { TabsList, TabsTrigger } from '@/components/animate-ui/radix/tabs'

import type { TaskStatuses } from '@/types/task.types'

import { useI18n } from '@/utils/providers'

import type { ModelsTask } from '../../../../../../../../generated/api'

import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm'
import { TABS } from './constants/data'
import { getNumOfTasksByStatus } from '@/lib/helpers/task/getNumOfTasksByStatus'
import { $sortType, sortTypeUpdated as updateSortType } from '@/stores/task/sort-type'
import { $statusType } from '@/stores/task/status-type'

export function LastTasksHeader({ tasks }: { tasks: ModelsTask[] }) {
	const i18n = useI18n()
	const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

	const statusType = useUnit($statusType)
	const sortType = useUnit($sortType)
	const numOfTasksByStatus = getNumOfTasksByStatus(tasks)

	const changeSortType = () => {
		const newSortType = sortType === 'asc' ? 'desc' : 'asc'
		updateSortType(newSortType)
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<TabsList dir='ltr'>
						{TABS.map(tab => {
							return (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
								>
									{i18n.formatMessage({ id: `last-tasks.status.${tab.value}` })}
								</TabsTrigger>
							)
						})}
					</TabsList>
					<ChangeSortTypeButton
						frontText={i18n.formatMessage({ id: 'last-tasks.sort.desc' })}
						backText={i18n.formatMessage({ id: 'last-tasks.sort.asc' })}
						flipped={sortType == 'asc'}
						onClick={changeSortType}
						className='rounded-lg px-4 shadow'
					/>
				</div>

				<div className='flex items-center text-xl font-semibold'>
					<div
						className='bg-secondary cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-violet-400'
						onClick={() => setIsCreateFormOpen(true)}
					>
						<PlusIcon size={16} />
					</div>
					<span className='text-accent-foreground/60 pr-2 pl-1'>
						({numOfTasksByStatus[statusType]})
					</span>
					<HoverCard>
						<HoverCardTrigger className='cursor-pointer scroll-m-20'>
							{i18n.formatMessage({ id: 'last-tasks.title' })}
						</HoverCardTrigger>
						<HoverCardContent>
							{Object.keys(numOfTasksByStatus).map(key => {
								const validKey = key as TaskStatuses
								return (
									<div
										key={key}
										className='flex gap-2'
									>
										<p>
											{i18n.formatMessage({
												id: `last-tasks.status.${validKey}`
											})}
										</p>
										<p>{numOfTasksByStatus[validKey]}</p>
									</div>
								)
							})}
						</HoverCardContent>
					</HoverCard>
				</div>
			</div>
			<CreateTaskForm
				isOpen={isCreateFormOpen}
				onClose={() => setIsCreateFormOpen(false)}
			/>
		</>
	)
}
