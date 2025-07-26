import { v4 as uuidv4 } from 'uuid'

import type { DBTask } from '@/types/db.types'

import supabase from '@/lib/supabase/client'

export const createTask = async (params: Partial<DBTask>): Promise<DBTask> => {
	try {
		if (!params.title || !params.icon_name || !params.due_date || !params.status) {
			throw new Error('Missing required fields: title, icon_name, due_date, status')
		}

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
