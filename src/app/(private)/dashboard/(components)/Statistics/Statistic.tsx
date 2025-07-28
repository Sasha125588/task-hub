'use client'

import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { type Swapy, createSwapy } from 'swapy'

import { StatisticCard } from '@/components/common/StatisticCard'

import type { DBTask } from '@/types/db.types'

import { getNumOfTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'
import { getWorkingHours } from '@/utils/helpers/task/getWorkingHours'

import { StatisticsChart } from './components/StatisticsChart/StatisticsChart'
import { STATISTICS_CARDS } from './constants/data'

export function Statistic({ tasks }: { tasks: DBTask[] }) {
	const swapyRef = useRef<Swapy | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const statistics = getNumOfTasksByStatus(tasks)

	const workingHours = getWorkingHours(tasks)

	useEffect(() => {
		if (containerRef.current) {
			swapyRef.current = createSwapy(containerRef.current, {
				animation: 'dynamic',
				swapMode: 'hover',
				autoScrollOnDrag: true,
				enabled: true
			})

			swapyRef.current.onBeforeSwap(() => {
				return true
			})
		}
		return () => {
			swapyRef.current?.destroy()
		}
	}, [])

	return (
		<div className='flex h-[450px] gap-5'>
			<div
				ref={containerRef}
				className='flex h-full flex-col gap-5'
			>
				{STATISTICS_CARDS.map(card => (
					<div
						data-swapy-slot={card.id}
						key={card.id}
						className='flex-1'
					>
						<motion.div
							className='h-full'
							data-swapy-item={card.id}
							whileTap={{ scale: 0.95 }}
						>
							<StatisticCard
								title={
									card.id === 'completed'
										? workingHours.toString()
										: statistics[card.id as keyof typeof statistics].toString()
								}
								desc={card.desc}
								imgSrc={card.imgSrc}
								colorClass={card.colorClass}
								darkColorClass={card.darkColorClass}
							/>
						</motion.div>
					</div>
				))}
			</div>
			<div className='h-full flex-1'>
				<StatisticsChart tasks={tasks} />
			</div>
		</div>
	)
}
