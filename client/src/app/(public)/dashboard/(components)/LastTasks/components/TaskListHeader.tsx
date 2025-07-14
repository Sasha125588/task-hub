import { useUnit } from 'effector-react'

import { FlipButton as ChangeSortTypeButton } from '@/components/animate-ui/buttons/flip'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/components/animate-ui/radix/hover-card'
import { TabsList, TabsTrigger } from '@/components/animate-ui/radix/tabs'

import type { TaskStatuses } from '@/types/task.types'

import { TABS } from '../constants/data'

import { TASK_CONFIG } from '@/configs/task.config'
import {
	$numTasksByStatus,
	$sortType,
	$statusType,
	sortTypeUpdated as updateSortType
} from '@/stores/task/store'

const FRONT_TEXT = TASK_CONFIG.CHANGE_SORT_TYPE_BUTTON_TEXT.frontText
const BACK_TEXT = TASK_CONFIG.CHANGE_SORT_TYPE_BUTTON_TEXT.backText

export function TaskListHeader() {
	const statusType = useUnit($statusType)
	const sortType = useUnit($sortType)
	const numOfTasksByStatus = useUnit($numTasksByStatus)

	const changeSortType = () => {
		const newSortType = sortType === 'asc' ? 'desc' : 'asc'
		updateSortType(newSortType)
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<TabsList dir='ltr'>
					{TABS.map(tab => {
						return (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
							>
								{tab.title}
							</TabsTrigger>
						)
					})}
				</TabsList>
				<ChangeSortTypeButton
					frontText={FRONT_TEXT}
					backText={BACK_TEXT}
					flipped={sortType == 'asc'}
					onClick={changeSortType}
					className='rounded-lg shadow'
				/>
			</div>
			<h4 className='font-geist-sans text-xl font-semibold tracking-tight'>
				<HoverCard>
					<HoverCardTrigger className='cursor-pointer scroll-m-20 pr-1'>
						Last Tasks
					</HoverCardTrigger>
					<HoverCardContent>
						{Object.keys(numOfTasksByStatus).map(key => {
							const validKey = key as TaskStatuses
							return (
								<div
									key={key}
									className='flex gap-2'
								>
									<p>{validKey}</p>
									<p>{numOfTasksByStatus[validKey]}</p>
								</div>
							)
						})}
					</HoverCardContent>
				</HoverCard>
				<span className='text-accent-foreground/60'>
					{numOfTasksByStatus[statusType]}
				</span>
			</h4>
		</div>
	)
}
