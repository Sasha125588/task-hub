'use client'

import { Tabs } from '@/components/animate-ui/radix/tabs'
import { I18nText } from '@/components/common/I18nText/I18nText'

import { type TaskStatuses } from '@/types/sort.types'

import { LastTasksContent } from './components/LastTasksContent/LastTasksContent'
import { LastTasksHeader } from './components/LastTasksHeader/LastTasksHeader'
import { useLastTasks } from './hooks/useLastTasks'

export function LastTasks() {
	const { state, functions } = useLastTasks()

	const changeStatusType = (value: string) => {
		const newType = value as TaskStatuses
		functions.setStatusType(newType)
	}

	return (
		<Tabs
			defaultValue={state.statusType}
			dir='rtl'
			onValueChange={changeStatusType}
		>
			<div className='flex flex-col gap-3'>
				<LastTasksHeader
					tasks={state.tasks}
					statusType={state.statusType}
					sortType={state.sortType}
					setSortType={functions.setSortType}
				/>

				{state.tasks.length > 0 ? (
					<LastTasksContent tasks={state.tasks} />
				) : (
					<div className='flex h-52 items-center justify-center'>
						<p className='text-muted-foreground'>
							<I18nText path='tasks.notFound' />
						</p>
					</div>
				)}
			</div>
		</Tabs>
	)
}
