'use client'

import { useEffect, useState } from 'react'

import type { DBMessage } from '@/types/db.types'

import { getMessages } from '@/utils/api'

import supabase from '@/lib/supabase/client'

export const useRealtimeMessages = (channelId: string) => {
	const [messages, setMessages] = useState<DBMessage[]>([])

	useEffect(() => {
		const getInitialMessages = async () => {
			const data = await getMessages(channelId)
			if (data) {
				setMessages(data)
			}
		}
		getInitialMessages()
	}, [channelId])

	useEffect(() => {
		const channel = supabase.channel(`messages:${channelId}`)

		channel
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
					filter: `channel_id=eq.${channelId}`
				},
				payload => setMessages(messages => [...messages, payload.new as DBMessage])
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [channelId])

	return messages
}
