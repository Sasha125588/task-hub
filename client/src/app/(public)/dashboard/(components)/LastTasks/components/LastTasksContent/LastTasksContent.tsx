import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { TabsContent } from '@/components/animate-ui/radix/tabs'

import { LastTasksItem } from '../LastTasksItem/LastTasksItem'

import { TASK_CONFIG } from '@/configs/task.config'
import {
	$filteredTasks,
	$numTasksByStatus,
	$statusType
} from '@/stores/task/store'

const DISPLAYED_TASKS_LIMIT = TASK_CONFIG.DISPLAYED_TASKS_LIMIT

export function LastTasksContent() {
	const [isShowAll, setIsShowAll] = useQueryState('show-all', parseAsBoolean)

	const tasks = useUnit($filteredTasks)
	const statusType = useUnit($statusType)
	const numOfTasksByStatus = useUnit($numTasksByStatus)

	const displayedTasks = useMemo(() => {
		return isShowAll ? tasks : tasks.slice(0, DISPLAYED_TASKS_LIMIT)
	}, [tasks, isShowAll])

	const hasMoreTasks = tasks.length > DISPLAYED_TASKS_LIMIT

	const toggleShowAll = () => {
		setIsShowAll(!isShowAll)
	}

	return (
		<TabsContent
			value={statusType}
			dir='ltr'
		>
			<div className='grid grid-cols-3 gap-5'>
				<AnimatePresence initial={false}>
					{displayedTasks.map(task => (
						<motion.div
							key={task.id}
							exit={{
								opacity: 0,
								scale: 0.9
							}}
							layout
							whileHover={{ y: -2 }}
							transition={{
								duration: 0.2,
								layout: { duration: 0.3 }
							}}
						>
							<LastTasksItem item={task} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{hasMoreTasks && (
				<div className='font-geist-sans mt-5 text-center font-medium'>
					<button
						onClick={toggleShowAll}
						className={`cursor-pointer ${
							isShowAll
								? 'text-accent-foreground hover:text-accent-foreground/80'
								: 'text-primary hover:text-primary/80'
						}`}
					>
						{isShowAll ? (
							<div>Show less</div>
						) : (
							<div>Show all {numOfTasksByStatus[statusType]} tasks</div>
						)}
					</button>
				</div>
			)}
		</TabsContent>
	)
}
