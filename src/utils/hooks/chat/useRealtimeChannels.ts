'use client'

import { useEffect, useState } from 'react'

import type { DBChannel } from '@/types/db.types'

import { getChannels } from '@/utils/api'

import supabase from '@/lib/supabase/client'

export const useRealtimeChannels = () => {
	const [channels, setChannels] = useState<DBChannel[]>([])

	useEffect(() => {
		const getInitialChannels = async () => {
			const data = await getChannels()
			if (data) {
				setChannels(data)
			}
		}
		getInitialChannels()
	}, [])

	useEffect(() => {
		const channel = supabase.channel('channels_list')

		channel
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, payload =>
				setChannels(current => [...current, payload.new as DBChannel])
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, payload =>
				setChannels(current => current?.filter(channel => channel.id !== payload.old.id))
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [])

	return channels
}
