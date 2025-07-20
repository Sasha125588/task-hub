import { useQuery } from '@tanstack/react-query'

import type { GetAllTasksParams } from '../../../../../generated/api'
import { getAllTasks } from '../../requests'

export const useGetAllTasksQuery = (params?: GetAllTasksParams) =>
	useQuery({
		queryKey: ['getAllTasks', params],
		queryFn: () => getAllTasks(params),
		placeholderData: prev => prev
	})
