'use client'

import type { Database } from '../../../../../../../../generated/database.types'

import { ChatMessageItem } from '@/app/(private)/message/(components)/ChatWindow/components/MessageList/components/MessageItem/ChatMessageItem'

interface MessageListProps {
	messages: Database['public']['Tables']['messages']['Row'][]
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
