import supabase from '@/lib/supabase/client'

export const getChannel = async (id: string) => {
	try {
		const { data } = await supabase.from('channels').select('*').eq('id', id).single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
