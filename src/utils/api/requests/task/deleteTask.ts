import type { DeleteTasksByIdResponse } from '../../../../../generated/api'
import { api } from '../../instance'

export const deleteTask = async (id: string): Promise<DeleteTasksByIdResponse> =>
	await api(`tasks/${id}`, { method: 'DELETE' })
