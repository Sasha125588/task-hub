'use client'

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { Database } from "../../../../generated/database.types"
import { getChannels } from "@/utils/api"

export const useRealtimeChannels = () => {
    const supabase = createClient()
    const [channels, setChannels] = useState<Database["public"]["Tables"]["channels"]["Row"][]>([])
	

	useEffect(() => {
		const getInitialChannels = async () => {
			const data =  await getChannels() 
			if(data) {
				setChannels(data)
			}
		}
		getInitialChannels()
		
	}, [channels])

    useEffect(() => {
			const channelListener = supabase
			.channel('public:channels')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, payload =>
				setChannels((channels) => [...channels, payload.new as Database['public']['Tables']['channels']['Row']])
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, payload =>
				setChannels(channels?.filter(channel => channel.id !== payload.old.id))

			)
			.subscribe()

		return () => {
			supabase.removeChannel(channelListener)
		}
	}, [])

    return channels
}