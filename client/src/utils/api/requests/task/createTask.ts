import type { ModelsCreateTaskRequest, PostTasksResponse } from '../../../../../generated/api'
import { api } from '../../instance'

export const createTask = async ({
	params
}: {
	params: ModelsCreateTaskRequest
}): Promise<PostTasksResponse> => await api(`tasks`, { method: 'POST', body: params })
