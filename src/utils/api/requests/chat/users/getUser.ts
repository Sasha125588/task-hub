import { supabase } from '@/lib/supabase/client'

export const getUser = async (userId: string) => {
	try {
		const {data} = await supabase.from('user').select(`*`).eq('id', userId).single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
