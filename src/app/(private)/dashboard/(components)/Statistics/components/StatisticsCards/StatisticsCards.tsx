import { motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useMemo, useRef } from 'react'
import { type Swapy, createSwapy } from 'swapy'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Card, CardContent } from '@/components/ui/card'

import type { DBTask } from '@/types/db.types'

import { getNumOfTasksByStatus } from '@/utils/helpers/task/getNumOfTasksByStatus'
import { getWorkingHours } from '@/utils/helpers/task/getWorkingHours'

import { STATISTICS_CARDS } from '@/app/(private)/dashboard/(components)/Statistics/components/StatisticsCards/constants/data'

export function StatisticsCards({ tasks }: { tasks: DBTask[] }) {
	const swapyRef = useRef<Swapy | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const statistics = useMemo(() => getNumOfTasksByStatus(tasks), [tasks])

	const workingHours = useMemo(() => getWorkingHours(tasks), [tasks])

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
		<div
			ref={containerRef}
			className='flex h-full flex-col gap-5'
		>
			{STATISTICS_CARDS.map(card => {
				const title =
					card.id === 'completed'
						? workingHours.toString()
						: statistics[card.id as keyof typeof statistics].toString()

				return (
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
							<Card
								className={`border-border h-full w-full max-w-sm cursor-pointer border shadow ${card.colorClass} ${card.darkColorClass}`}
							>
								<CardContent className='flex items-center justify-between'>
									<div className='flex flex-col gap-1'>
										<h1 className='scroll-m-20 text-3xl font-semibold tracking-tight text-balance'>
											{title}
										</h1>
										<p className='leading-7 font-medium'>
											<I18nText path={`statistics.desc.${card.description}` as LocaleMessageId} />
										</p>
									</div>
									<Image
										className='select-none'
										src={card.imgSrc}
										alt={card.title}
										width={80}
										height={80}
									/>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				)
			})}
		</div>
	)
}
