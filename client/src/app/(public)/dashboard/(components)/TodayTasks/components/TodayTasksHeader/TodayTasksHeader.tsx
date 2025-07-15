import {
	AvatarGroup,
	AvatarGroupTooltip
} from '@/components/animate-ui/components/avatar-group'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

import type { Task } from '@/types/task.types'

import { useI18n } from '@/utils/providers'

interface Props {
	tasks: Task[]
}

export function TodayTasksHeader({ tasks }: Props) {
	const i18n = useI18n()
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h2 className='mb-1 text-2xl font-bold'>
					{i18n.formatMessage({ id: 'dashboard.todayTasks.title' })}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{tasks.length
						? i18n.formatMessage(
								{
									id: 'dashboard.todayTasks.tasksScheduled'
								},
								{
									count: tasks.length
								}
							)
						: i18n.formatMessage({
								id: 'dashboard.todayTasks.noTasksScheduled'
							})}
				</p>
			</div>
			<AvatarGroup className='-space-x-3'>
				{Array.from(new Set(tasks.flatMap(task => task.users))).map(
					(user, idx) => (
						<Avatar
							key={idx}
							className='border-background size-9 border-1'
						>
							<AvatarImage src={user.src} />
							<AvatarGroupTooltip>
								<p>{user.name}</p>
							</AvatarGroupTooltip>
						</Avatar>
					)
				)}
			</AvatarGroup>
		</div>
	)
}
