import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { FlipButton as ChangeSortTypeButton } from '@/components/animate-ui/buttons/flip'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/components/animate-ui/radix/hover-card'
import { TabsList, TabsTrigger } from '@/components/animate-ui/radix/tabs'
import { I18nText } from '@/components/common/I18nText/I18nText'

import type { DBTask } from '@/types/db.types'
import { type TSortFilter, type TStatusFilter, type TaskStatuses } from '@/types/sort.types'

import { getNumOfTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'
import { useI18n } from '@/utils/providers'

import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm'
import { TABS } from './constants/data'

export function LastTasksHeader({
	tasks,
	statusType,
	sortType,
	setSortType
}: {
	tasks: DBTask[]
	statusType: TStatusFilter
	sortType: TSortFilter
	setSortType: (sortType: TSortFilter) => void
}) {
	const i18n = useI18n()
	const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

	const numberOfTasksByStatus = useMemo(() => getNumOfTasksByStatus(tasks), [tasks])

	const changeSortType = () => {
		const newSortType = sortType === 'asc' ? 'desc' : 'asc'
		setSortType(newSortType)
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
									<I18nText path={`last-tasks.status.${tab.value}`} />
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
						({numberOfTasksByStatus[statusType]})
					</span>
					<HoverCard>
						<HoverCardTrigger className='cursor-pointer scroll-m-20'>
							<I18nText path='last-tasks.title' />
						</HoverCardTrigger>
						<HoverCardContent>
							{Object.keys(numberOfTasksByStatus).map(key => {
								const validKey = key as TaskStatuses
								return (
									<div
										key={key}
										className='flex gap-2'
									>
										<p>
											<I18nText path={`last-tasks.status.${validKey}`} />
										</p>
										<p>{numberOfTasksByStatus[validKey]}</p>
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
