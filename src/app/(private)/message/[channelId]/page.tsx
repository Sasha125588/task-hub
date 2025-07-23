'use client'

import { Suspense } from 'react'
import { use } from 'react'

import { LoadingSpinner } from '@/components/ui/loading-spinner'

import { useGetChannelQuery } from '@/utils/api/hooks/chat/useGetChannelQuery'

import { ChatWindow } from '../(components)/ChatWindow/ChatWindow'

interface ChannelPageProps {
	params: Promise<{ channelId: string }>
}

export default function ChannelPage({ params }: ChannelPageProps) {
	const { channelId } = use(params)

	const { data, isLoading } = useGetChannelQuery(channelId)

	if (isLoading) {
		return (
			<div className='flex h-[calc(100%+40px)] w-full items-center justify-center'>
				<LoadingSpinner />
			</div>
		)
	}

	if (!data) {
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
			<ChatWindow channel={data} />
		</Suspense>
	)
}
