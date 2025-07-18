'use client'

import { use } from 'react'

import { sendMessage } from '@/utils/api'
import { useChatStore } from '@/utils/hooks/useChatStore'

import { ChatWindow } from '../(components)/ChatWindow/ChatWindow'

interface ChannelPageProps {
	params: Promise<{ channelId: string }>
}

export default function ChannelPage({ params }: ChannelPageProps) {
	const { channelId } = use(params)
	const channelIdNumber = parseInt(channelId)

	const { messages, channels } = useChatStore({
		channelId: channelIdNumber
	})

	const currentChannel = channels.find(ch => ch.id === channelIdNumber)

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

	const handleSendMessage = async (message: string, channelId: number, userId: string) => {
		await sendMessage(message, channelId, userId)
	}

	return (
		<ChatWindow
			channel={currentChannel}
			messages={messages}
			isConnected={true}
			onSendMessage={handleSendMessage}
		/>
	)
}
