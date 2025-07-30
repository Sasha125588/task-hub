import { AnimatePresence, motion } from 'motion/react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import { TabsContent } from '@/components/animate-ui/radix/tabs'
import { I18nText } from '@/components/common/I18nText/I18nText'

import type { DBTask } from '@/types/db.types'
import { type TStatusFilter } from '@/types/sort.types'

import { Task } from './Task/Task'
import { TASK_CONFIG } from '@/configs/task.config'

const ANIMATION_VARIANTS = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	whileHover: { y: -2 },
	transition: { duration: 0.2, layout: { duration: 0.3 } }
} as const

const DISPLAYED_TASKS_LIMIT = TASK_CONFIG.DISPLAYED_TASKS_LIMIT

export function LastTasksContent({
	tasks,
	statusType
}: {
	tasks: DBTask[]
	statusType: TStatusFilter
}) {
	const [isShowAll, setIsShowAll] = useQueryState('show-all', parseAsBoolean)

	const toggleShowAll = () => {
		setIsShowAll(!isShowAll)
	}

	return (
		<TabsContent
			value={statusType}
			dir='ltr'
		>
			<div className='grid grid-cols-3 gap-5'>
				<AnimatePresence
					initial={false}
					mode='popLayout'
				>
					{tasks.map(task => (
						<motion.div
							key={task.id}
							layout
							{...ANIMATION_VARIANTS}
						>
							<Task item={task} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{tasks.length >= DISPLAYED_TASKS_LIMIT && (
				<div className='mt-5 text-center font-medium'>
					<button
						onClick={toggleShowAll}
						className={`cursor-pointer ${
							isShowAll
								? 'text-accent-foreground hover:text-accent-foreground/80'
								: 'text-primary hover:text-primary/80'
						}`}
					>
						{isShowAll ? (
							<div>
								<I18nText path='last-tasks.show-less' />
							</div>
						) : (
							<div>
								<I18nText path='last-tasks.show-all' />
							</div>
						)}
					</button>
				</div>
			)}
		</TabsContent>
	)
}
