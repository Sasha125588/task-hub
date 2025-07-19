import { supabase } from '@/lib/supabase/client'

export const getUser = async (userId: string) => {
	try {
		const { data } = await supabase.from('user').select(`*`).eq('id', userId)
		const user = data?.[0]
		return user
	} catch (error) {
		console.log('error', error)
	}
}
