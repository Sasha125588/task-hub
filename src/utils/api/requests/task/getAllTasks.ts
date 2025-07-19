import type { GetAllTasksParams, GetTasksResponse } from '../../../../../generated/api'
import { api } from '../../instance'

export const getAllTasks = async (params?: GetAllTasksParams): Promise<GetTasksResponse> => {
	const searchParams = new URLSearchParams()

	if (params?.status) searchParams.append('status', params.status)
	if (params?.sort_by) searchParams.append('sort_by', params.sort_by)
	if (params?.sort_type) searchParams.append('sort_type', params.sort_type)
	if (params?.limit) searchParams.append('limit', params.limit.toString())
	if (params?.offset) searchParams.append('offset', params.offset.toString())

	const queryString = searchParams.toString()
	const url = queryString ? `tasks?${queryString}` : 'tasks'

	return await api(url, { method: 'GET' })
}
