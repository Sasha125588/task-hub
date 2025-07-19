import type { ChatChannel } from '@/types/chat.types'

import { supabase } from '@/lib/supabase/client'

export const getChannels = async (setState?: (channels: ChatChannel[]) => void) => {
	try {
		const { data } = await supabase.from('channels').select('*')
		if (setState) setState(data || [])
		return data
	} catch (error) {
		console.log('error', error)
	}
}
