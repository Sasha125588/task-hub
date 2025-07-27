'use server'

import { revalidatePath } from 'next/cache'

import type { DBSubTask } from '@/types/db.types'

import { updateSubTask } from '@/utils/api'

export const handleUpdateSubTask = async ({
	taskId,
	body
}: {
	taskId: string
	body: Partial<DBSubTask>
}) => {
	try {
		await updateSubTask({ id: taskId, params: body })

		revalidatePath(`/dashboard/task/${taskId}`)
	} catch (error) {
		console.error('Error updating sub task:', error)
		throw error
	}
}
