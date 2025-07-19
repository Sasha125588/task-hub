'use client'

import { use } from 'react'

import { useChatStore } from '@/utils/hooks/useChatStore'

import { ChatWindow } from '../(components)/ChatWindow/ChatWindow'

interface ChannelPageProps {
	params: Promise<{ channelId: string }>
}

export default function ChannelPage({ params }: ChannelPageProps) {
	const { channelId } = use(params)

	const { messages, channels } = useChatStore({
		channelId
	})

	const currentChannel = channels.find(ch => ch.id === channelId)

	if (!currentChannel) {
		return (
			<div className='flex h-full items-center justify-center'>
				<div className='text-center'>
					<h2 className='mb-2 text-lg font-semibold'>Channel not found</h2>
					<p className='text-muted-foreground'>
						This channel may have been deleted or doesn&apos;t exist.
					</p>
				</div>
			</div>
		)
	}

	return (
		<ChatWindow
			channel={currentChannel}
			messages={messages}
		/>
	)
}
