'use server'

import { revalidatePath } from 'next/cache'

import type { DBSubTask } from '@/types/db.types'

import { reorderSubTasks } from '@/utils/api'

interface ReorderParams {
	subTasks: DBSubTask[]
	sourceIndex: number
	destinationIndex: number
	taskId: string
}

export const handleReorderSubTasks = async ({
	subTasks,
	sourceIndex,
	destinationIndex,
	taskId
}: ReorderParams) => {
	try {
		await reorderSubTasks(subTasks, { sourceIndex, destinationIndex })

		revalidatePath(`/dashboard/task/${taskId}`)
	} catch (error) {
		console.error('Error reordering sub tasks:', error)
		throw error
	}
}
