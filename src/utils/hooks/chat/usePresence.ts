'use client'

import { useEffect, useState } from 'react'

import supabase from '@/lib/supabase/client'

export const useOnlineUsers = (channelId: string, userId: string) => {
	const [onlineUsers, setOnlineUsers] = useState(0)

	useEffect(() => {
		const userStatus = {
			user_id: userId,
			online_at: new Date().toISOString()
		}

		const channel = supabase.channel(`presence:${channelId}`, {
			config: {
				presence: {
					key: userId
				}
			}
		})

		channel
			.on('presence', { event: 'sync' }, () => {
				const presenceData = channel.presenceState()
				const userIds: string[] = []
				for (const id in channel.presenceState()) {
					const userData = presenceData[id][0] as unknown as typeof userStatus
					userIds.push(userData.user_id)
				}
				setOnlineUsers([...new Set(userIds)].length)
			})
			.subscribe(async status => {
				if (status === 'SUBSCRIBED') {
					await channel.track(userStatus)
				}
			})

		return () => {
			channel.untrack()
			channel.unsubscribe()
		}
	}, [channelId, userId])

	return onlineUsers
}
