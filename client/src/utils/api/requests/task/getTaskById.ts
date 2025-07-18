import type { GetTasksByIdResponse } from '../../../../../generated/api'
import { api } from '../../instance'

export const getTaskById = async (id: string): Promise<GetTasksByIdResponse> =>
	await api(`tasks/${id}`, { method: 'GET' })
