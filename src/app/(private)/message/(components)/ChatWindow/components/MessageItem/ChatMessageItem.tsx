import { formatDate } from 'date-fns'

import type { ChatMessage } from '@/types/chat.types'

import { useGetUserQuery } from '@/utils/api/hooks/chat/useGetUserQuery'

interface ChatMessageItemProps {
	message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
	const formattedTime = formatDate(message.inserted_at, 'p')
	const { data: user } = useGetUserQuery(message.user_id)

	const username = user?.name

	return (
		<div className='group hover:bg-muted/50 relative rounded-lg px-4 py-1 transition-colors'>
			<div className='mb-1 flex items-baseline gap-2'>
				<span className='text-sm font-medium'>{username}</span>
				<span className='text-muted-foreground text-xs'>{formattedTime}</span>
			</div>
			<div className='text-sm leading-relaxed'>{message.message}</div>
		</div>
	)
}
