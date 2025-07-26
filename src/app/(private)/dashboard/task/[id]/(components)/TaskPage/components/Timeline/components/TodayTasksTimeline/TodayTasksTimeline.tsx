import { motion } from 'motion/react'
import Link from 'next/link'

import { IconDisplay } from '@/components/common/IconPicker'

import type { DBTask } from '@/types/db.types'

import { timeSlots } from './constants/data'
import { getTaskWidth, getTimePosition } from './helpers'
import { PAGES_CONFIG } from '@/configs/pages.config'

interface Props {
	tasks: DBTask[]
	currentTimePosition: number
}

export function TodayTasksTimeline({ tasks, currentTimePosition }: Props) {
	const isWithinWorkHours = currentTimePosition >= 0 && currentTimePosition <= 100

	return (
		<div>
			<div className='relative'>
				<div className='flex justify-between'>
					{timeSlots.map((time, index) => (
						<div
							key={index}
							className='relative flex flex-col items-center'
						>
							<div className='text-muted-foreground mb-2 text-sm font-medium'>{time}</div>
							<div className='bg-accent/50 h-[400px] w-px' />
						</div>
					))}
				</div>

				<div className='absolute inset-0 mt-4'>
					{isWithinWorkHours && (
						<div
							className='bg-primary absolute top-0 bottom-0 z-10 w-0.5'
							style={{ left: `${currentTimePosition}%` }}
						>
							<div className='bg-primary absolute top-0 -left-1 h-2.5 w-2.5 rounded-full' />
						</div>
					)}

					{tasks.map((task, index) => {
						const leftPosition = getTimePosition(task.start_time ?? '')
						const width = getTaskWidth(task.start_time ?? '', task.end_time ?? '')
						const verticalPosition = (index % 3) * 30 + 10

						return (
							<motion.div
								key={task.id}
								className='bg-primary/80 absolute min-w-[160px] cursor-pointer rounded-lg border-2 border-transparent p-3 dark:bg-violet-400'
								style={{
									left: `${leftPosition}%`,
									width: `${width}%`,
									top: `${verticalPosition}%`
								}}
								whileHover={{
									y: -4,
									scale: 1.05,
									transition: { duration: 0.2 }
								}}
							>
								<Link
									href={PAGES_CONFIG.EDIT_TASK_URL(task.id)}
									className='h-full'
								>
									<div className='flex items-center gap-2'>
										<div className='text-primary ml-[-2px] rounded-lg bg-white p-1.5 dark:bg-black dark:text-white'>
											<IconDisplay
												size={22}
												iconName={task.icon_name}
											/>
										</div>
										<div>
											<h3 className='text-sm font-semibold text-white'>{task.title}</h3>
											<p className='text-xs text-white/90'>
												{task.start_time} - {task.end_time}
											</p>
										</div>
									</div>
								</Link>
							</motion.div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
