import type { DBSubTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

interface ReorderParams {
	sourceIndex: number
	destinationIndex: number
}

export const reorderSubTasks = async (
	subTasks: DBSubTask[],
	{ sourceIndex, destinationIndex }: ReorderParams
): Promise<DBSubTask[]> => {
	try {
		const reorderedSubTasks = [...subTasks]
		const [movedItem] = reorderedSubTasks.splice(sourceIndex, 1)
		reorderedSubTasks.splice(destinationIndex, 0, movedItem)

		const now = new Date().toISOString()
		const updates = reorderedSubTasks.map((subTask, index) => ({
			...subTask,
			order: index + 1,
			updated_at: now
		}))

		const { error } = await supabase.from('sub_tasks').upsert(updates, { onConflict: 'id' })

		if (error) throw error
		return updates
	} catch (error) {
		console.error('Error reordering sub-tasks:', error)
		throw error
	}
}
