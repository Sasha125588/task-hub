import { useRealtimeMessages } from '@/utils/hooks/chat/useRealtimeMessages'

import { ChatMessageItem } from './components/MessageItem/ChatMessageItem'

interface MessageListProps {
	channelId: string
	channelSlug: string
}

export function MessageList({ channelId, channelSlug }: MessageListProps) {
	const messages = useRealtimeMessages(channelId)

	if (!messages?.length) {
		return (
			<div className='text-muted-foreground text-center text-sm'>
				No messages in #{channelSlug} yet. Start the conversation!
			</div>
		)
	}

	return (
		<div className='space-y-1'>
			{messages.map(message => (
				<ChatMessageItem
					key={message.id}
					message={message}
				/>
			))}
		</div>
	)
}
