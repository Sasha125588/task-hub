import { useQuery } from '@tanstack/react-query'

import type { DBTask } from '@/types/db.types'

import { type GetAllTasksParams, getAllTasks } from '../../requests'

export const useGetTasksQuery = (params?: GetAllTasksParams) =>
	useQuery<DBTask[]>({
		queryKey: [
			'getAllTasks',
			params?.limit,
			params?.offset,
			params?.sort_by,
			params?.sort_type,
			params?.status
		],
		queryFn: async () => await getAllTasks(params),
		placeholderData: prev => prev
	})
