'use server'

import { revalidatePath } from 'next/cache'

import { deleteSubTask } from '@/utils/api'

export const handleDeleteSubTask = async (subTaskId: string, taskId: string) => {
	try {
		await deleteSubTask(subTaskId)

		revalidatePath(`/dashboard/task/${taskId}`)
	} catch (error) {
		console.error('Error deleting sub task:', error)
		throw error
	}
}
