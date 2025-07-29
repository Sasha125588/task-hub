import type { DBTask } from '@/types/db.types'
import type { TSortFilter, TStatusFilter } from '@/types/task.types'

import supabase from '@/lib/supabase/client'

export interface GetAllTasksParams {
	status?: TStatusFilter
	sort_by?: string
	sort_type?: TSortFilter
	limit?: string
	offset?: string
}

export const getAllTasks = async (params?: GetAllTasksParams): Promise<DBTask[]> => {
	try {
		let query = supabase.from('tasks').select('*')

		if (params?.status) {
			query = query.eq('status', params.status)
		}

		if (params?.sort_by && params?.sort_type) {
			query = query.order(params.sort_by, {
				ascending: params.sort_type === 'asc'
			})
		}

		if (params?.limit) {
			query = query.limit(parseInt(params.limit))
		}

		if (params?.offset) {
			query = query.range(
				parseInt(params.offset),
				parseInt(params.offset) + (params.limit ? parseInt(params.limit) : 10) - 1
			)
		}

		const { data, error } = await query

		if (error) throw error
		return data
	} catch (error) {
		console.error('Error fetching tasks:', error)
		throw error
	}
}
