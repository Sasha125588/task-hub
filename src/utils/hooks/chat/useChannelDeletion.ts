'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import supabase from '@/lib/supabase/client'

export const useChannelDeletion = (channelId: string) => {
	const router = useRouter()

	useEffect(() => {
		const channel = supabase
			.channel('channel_deletion')
			.on(
				'postgres_changes',
				{
					event: 'DELETE',
					schema: 'public',
					table: 'channels',
					filter: `id=eq.${channelId}`
				},
				() => {
					router.push('/message')
				}
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [channelId])
}
