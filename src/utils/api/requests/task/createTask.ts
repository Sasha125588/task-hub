import { v4 as uuidv4 } from 'uuid'

import type { DBTask } from '@/types/db.types'
import type { TaskStatuses } from '@/types/task.types'

import supabase from '@/lib/supabase/client'

export interface CreateTaskParams {
	title: string
	description?: string
	status: TaskStatuses
	due_date: string
	icon_name: string
	assignee_id?: string
	start_time?: string
	end_time?: string
}

export const createTask = async (params: CreateTaskParams): Promise<DBTask> => {
	try {
		const taskData = {
			id: uuidv4(),
			title: params.title,
			icon_name: params.icon_name,
			start_time: params.start_time,
			end_time: params.end_time,
			due_date: params.due_date,
			status: params.status
		}

		const { data, error } = await supabase.from('tasks').insert([taskData]).select().single()

		if (error) throw error
		return data
	} catch (error) {
		console.error('Error creating task:', error)
		throw error
	}
}
