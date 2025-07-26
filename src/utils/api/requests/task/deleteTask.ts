import supabase from '@/lib/supabase/client'

export const deleteTask = async (id: string) => {
	try {
		const { data } = await supabase.from('tasks').delete().match({ id }).single()

		return data
	} catch (error) {
		console.error('Error creating task:', error)
		throw error
	}
}
