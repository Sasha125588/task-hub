import { useQuery } from '@tanstack/react-query'

import { getSubTasks } from '@/utils/api/requests'

export const useGetSubTasksQuery = (id: string) =>
	useQuery({
		queryKey: ['getSubTasks', id],
		queryFn: () => getSubTasks(id)
	})
