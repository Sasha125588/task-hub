import { Image as ImageIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { BrushIcon } from '@/components/animate-ui/icons/brush-icon'
import { MessageSquareMore } from '@/components/animate-ui/icons/message-square-more-icon'
import { SquareArrowOutUpRight } from '@/components/animate-ui/icons/square-arrow-out-up-right-icon'
// import { AvatarGroup, AvatarGroupTooltip } from '@/components/animate-ui/components/avatar-group'
import { TrashIcon } from '@/components/animate-ui/icons/trash-icon'
import { I18nText } from '@/components/common/I18nText/I18nText'
import { IconDisplay } from '@/components/common/IconPicker/IconPicker'
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar'
// import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { GlowingEffect } from '@/components/ui/glowing-effect'

import type { DBTask } from '@/types/db.types'

import { useDeleteTaskMutation } from '@/utils/api'
import { getDaysUntilDue } from '@/utils/helpers/date/getDaysUntilDue'

import { PAGES_CONFIG } from '@/configs/pages.config'

export function Task({ item }: { item: DBTask }) {
	const deleteTaskMutation = useDeleteTaskMutation().mutate
	const dueDate = getDaysUntilDue(new Date(item.due_date ?? ''))

	const handleDeleteTask = () => {
		deleteTaskMutation(item.id!)
	}

	return (
		<Card className='relative overflow-visible'>
			<GlowingEffect
				spread={40}
				glow={true}
				disabled={false}
				proximity={64}
				inactiveZone={0.01}
			/>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<div className='flex min-w-0 items-center gap-2'>
						<div className='bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg shadow-md'>
							<IconDisplay iconName={item.icon_name} />
						</div>
						<div className='min-w-0 flex-1'>
							<h3 className='truncate text-sm font-medium'>{item.title}</h3>
							<p className='text-muted-foreground text-xs'>
								<I18nText path='last-tasks.due' />: {dueDate} <I18nText path='last-tasks.days' />
							</p>
						</div>
					</div>
					{/* TODO: add users */}
					{/* {item.users && (
						<AvatarGroup className='-space-x-3'>
							{item.users.map((user, idx) => (
								<Avatar
									key={idx}
									className='border-background size-9 border-1'
								>
									<AvatarImage src={user.src} />
									<AvatarGroupTooltip>
										<p>{user.name}</p>
									</AvatarGroupTooltip>
								</Avatar>
							))}
						</AvatarGroup>
					)} */}
				</div>

				<ProgressBar progress={item.progress ?? 0} />

				<div className='text-muted-foreground flex items-center justify-between text-xs'>
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-1'>
							<MessageSquareMore
								animateOnHover
								size={18}
								className='cursor-pointer'
							/>
							<p className='text-accent-foreground cursor-default text-base'>{item.comments}</p>
						</div>
						<div className='flex items-center gap-1'>
							<motion.div
								whileHover={{ scale: 1.1 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<ImageIcon
									size={18}
									className='cursor-pointer'
								/>
							</motion.div>

							<p className='text-accent-foreground cursor-default text-base'>{item.attachments}</p>
						</div>
						<div className='flex items-center gap-1'>
							<SquareArrowOutUpRight
								className='cursor-pointer'
								size={18}
								animateOnHover
							/>
							<p className='text-accent-foreground cursor-default text-base'>{item.links}</p>
						</div>
					</div>
					<div className='flex gap-3'>
						<div className='border-primary/75 flex size-9 items-center justify-center rounded-full border-[1.5px]'>
							<Link href={PAGES_CONFIG.EDIT_TASK_URL(item.id!)}>
								<BrushIcon
									className='cursor-pointer'
									animateOnHover
									size={19}
									color='var(--primary)'
								/>
							</Link>
						</div>
						<div
							onClick={handleDeleteTask}
							className='flex size-9 items-center justify-center rounded-full bg-rose-600'
						>
							<TrashIcon
								color='white'
								className='cursor-pointer'
								animateOnHover
								size={19}
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
