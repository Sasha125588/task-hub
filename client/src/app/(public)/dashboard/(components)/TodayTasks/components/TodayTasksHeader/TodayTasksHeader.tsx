import {
	AvatarGroup,
	AvatarGroupTooltip
} from '@/components/animate-ui/components/avatar-group'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

import type { Task } from '@/types/task.types'

interface Props {
	tasks: Task[]
}

export function TodayTasksHeader({ tasks }: Props) {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h2 className='mb-1 text-2xl font-bold'>Today&apos;s Tasks</h2>
				<p className='text-muted-foreground text-sm'>
					{tasks.length
						? `${tasks.length} task${tasks.length === 1 ? '' : 's'} scheduled for today`
						: 'No tasks scheduled for today'}
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
