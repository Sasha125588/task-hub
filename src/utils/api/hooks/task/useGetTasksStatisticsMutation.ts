import { useQuery } from '@tanstack/react-query'

import type { DBTask } from '@/types/db.types'

import { getAllTasks } from '../../requests'

export const useGetTasksStatisticsMutation = () =>
	useQuery<DBTask[]>({
		queryKey: ['getTasksStatistics'],
		queryFn: async () => await getAllTasks(),
		placeholderData: prev => prev
	})
