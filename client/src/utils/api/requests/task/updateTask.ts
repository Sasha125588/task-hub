import type { ModelsUpdateTaskRequest, PutTasksByIdResponse } from '../../../../../generated/api'
import { api } from '../../instance'

export const updateTask = async ({
	id,
	params
}: {
	id: string
	params: ModelsUpdateTaskRequest
}): Promise<PutTasksByIdResponse> => await api(`tasks/${id}`, { method: 'PUT', body: params })
