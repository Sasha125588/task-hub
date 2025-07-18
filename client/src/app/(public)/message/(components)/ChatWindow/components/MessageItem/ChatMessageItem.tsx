import { formatDate } from 'date-fns'

import type { ChatMessage } from '@/types/chat.types'

interface ChatMessageItemProps {
	message: ChatMessage
	username: string
}

export function ChatMessageItem({ message, username }: ChatMessageItemProps) {
	const formattedTime = formatDate(message.inserted_at, 'p')

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
