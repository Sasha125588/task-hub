'use client'

import { useEffect, useState } from 'react'

import { getMessages } from '@/utils/api'

import type { Database } from '../../../../generated/database.types'

import supabase from '@/lib/supabase/client'

export const useRealtimeMessages = (channelId: string) => {
	const [messages, setMessages] = useState<Database['public']['Tables']['messages']['Row'][]>([])

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
				payload =>
					setMessages(messages => [
						...messages,
						payload.new as Database['public']['Tables']['messages']['Row']
					])
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [channelId])

	return messages
}
