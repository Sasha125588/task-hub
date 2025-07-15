'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { type Swapy, createSwapy } from 'swapy'

import { Card, CardContent } from '@/components/ui/card'

import { StatisticsChart } from './components/StatisticsChart/StatisticsChart'
import { STATISTICS_CARDS } from './constants/data'

export function Statistic() {
	const swapyRef = useRef<Swapy | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

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
		<div>
			<div className='flex h-[450px] gap-5'>
				<div className='h-full w-70'>
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
								<div
									className='h-full'
									data-swapy-item={card.id}
								>
									<motion.div
										className='h-full'
										whileTap={{ scale: 0.95 }}
									>
										<Card
											className={`border-border h-full w-full max-w-sm cursor-pointer border shadow ${card.colorClass} ${card.darkColorClass}`}
										>
											<CardContent className='cards-center flex justify-between'>
												<div>
													<h1 className='scroll-m-20 text-4xl font-medium tracking-tight text-balance'>
														{card.title}
													</h1>
													<p className='leading-7 font-medium'>{card.desc}</p>
												</div>
												<Image
													src={card.imgSrc}
													alt={card.title}
													width={80}
													height={80}
												/>
											</CardContent>
										</Card>
									</motion.div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='h-full flex-1'>
					<StatisticsChart />
				</div>
			</div>
		</div>
	)
}
