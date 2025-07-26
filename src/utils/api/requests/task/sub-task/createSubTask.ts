import { v4 as uuidv4 } from 'uuid'

import type { DBSubTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export interface CreateSubTaskParams {
	title: string
	description?: string
	completed: boolean
}

export const createSubTask = async (
	task_id: string,
	params: CreateSubTaskParams
): Promise<DBSubTask> => {
	try {
		const now = new Date().toISOString()
		const subTaskData = {
			id: uuidv4(),
			task_id,
			title: params.title,
			description: params.description,
			completed: params.completed,
			created_at: now,
			updated_at: now
		}

		const { data, error } = await supabase.from('sub_tasks').insert(subTaskData).select().single()

		if (error) throw error
		return data
	} catch (error) {
		console.error('Error creating sub-task:', error)
		throw error
	}
}
