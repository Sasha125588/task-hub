'use server'

import { revalidatePath } from 'next/cache'

import { type CreateSubTaskParams, createSubTask } from '@/utils/api'

export const handleCreateSubTask = async ({
	taskId,
	body
}: {
	taskId: string
	body: CreateSubTaskParams
}) => {
	await createSubTask(taskId, body)
	revalidatePath(`/dashboard/task/${taskId}`)
}
