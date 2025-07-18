import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import { TabsContent } from '@/components/animate-ui/radix/tabs'

import { useI18n } from '@/utils/providers'

import type { ModelsTask } from '../../../../../../../../generated/api'
import { LastTasksItem } from '../LastTasksItem/LastTasksItem'

import { TASK_CONFIG } from '@/configs/task.config'
import { $statusType } from '@/stores/task/status-type'

const ANIMATION_VARIANTS = {
	exit: { opacity: 0, scale: 0.9 },
	whileHover: { y: -2 },
	transition: { duration: 0.2, layout: { duration: 0.3 } }
} as const

export function LastTasksContent({ tasks }: { tasks: ModelsTask[] }) {
	const i18n = useI18n()

	const [isShowAll, setIsShowAll] = useQueryState('show-all', parseAsBoolean)

	const statusType = useUnit($statusType)

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
							<LastTasksItem item={task} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{tasks.length >= TASK_CONFIG.DISPLAYED_TASKS_LIMIT && (
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
							<div>{i18n.formatMessage({ id: 'last-tasks.show-less' })}</div>
						) : (
							<div>{i18n.formatMessage({ id: 'last-tasks.show-all' })}</div>
						)}
					</button>
				</div>
			)}
		</TabsContent>
	)
}
