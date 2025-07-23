'use client'

import { useEffect, useState } from 'react'

import { getChannels } from '@/utils/api'

import type { Database } from '../../../../generated/database.types'

import supabase from '@/lib/supabase/client'

export const useRealtimeChannels = () => {
	const [channels, setChannels] = useState<Database['public']['Tables']['channels']['Row'][]>([])

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
				setChannels(current => [
					...current,
					payload.new as Database['public']['Tables']['channels']['Row']
				])
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
