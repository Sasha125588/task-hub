import { useQuery } from '@tanstack/react-query'

import type { DBTask } from '@/types/db.types'

import { getAllTasks } from '../../requests/client'

export const useGetTasksStatisticsMutation = (initialData: DBTask[]) =>
	useQuery<DBTask[]>({
		queryKey: ['getTasksStatistics'],
		queryFn: async () => await getAllTasks(),
		initialData
	})
