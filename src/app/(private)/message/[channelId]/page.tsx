'use client'

import { Suspense } from 'react'
import { use } from 'react'

import { LoadingSpinner } from '@/components/ui/loading-spinner'

import { useRealtimeChannels } from '@/utils/hooks/chat/useRealtimeChannels'

import { ChatWindow } from '../(components)/ChatWindow/ChatWindow'

interface ChannelPageProps {
	params: Promise<{ channelId: string }>
}

export default function ChannelPage({ params }: ChannelPageProps) {
	const { channelId } = use(params)
	const channels = useRealtimeChannels()
	const currentChannel = channels.find(ch => ch.id === channelId)

	if (!currentChannel) {
		return (
			<div className='flex h-[calc(100%+40px)] w-full items-center justify-center'>
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
		<Suspense
			fallback={
				<div className='flex h-full w-full items-center justify-center'>
					<LoadingSpinner />
				</div>
			}
		>
			<ChatWindow channel={currentChannel} />
		</Suspense>
	)
}
