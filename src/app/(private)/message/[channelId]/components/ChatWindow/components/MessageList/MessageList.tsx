import type { DBMessage } from '@/types/db.types'

import { ChatMessageItem } from '@/app/(private)/message/[channelId]/components/ChatWindow/components/MessageList/components/MessageItem/ChatMessageItem'

interface MessageListProps {
	messages: DBMessage[]
	channelSlug: string
}

export function MessageList({ messages, channelSlug }: MessageListProps) {
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
