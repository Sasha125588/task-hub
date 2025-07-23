import supabase from '@/lib/supabase/client'

export const deleteChannel = async (id: string) => {
	try {
		const { data } = await supabase.from('channels').delete().match({ id }).single()
		return data
	} catch (error) {
		console.log('error', error)
	}
}
