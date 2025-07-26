import supabase from '@/lib/supabase/client'

export const deleteSubTask = async (id: string) => {
	try {
		const { data, error } = await supabase.from('sub_tasks').delete().match({ id }).single()
		if (error) throw error
		return data
	} catch (error) {
		console.error('Error deleting sub-task:', error)
		throw error
	}
}
