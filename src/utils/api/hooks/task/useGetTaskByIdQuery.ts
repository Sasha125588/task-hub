import { useQuery } from '@tanstack/react-query'

import { getTaskById } from '../../requests'

export const useGetTaskByIdQuery = (id: string) =>
	useQuery({
		queryKey: ['getTaskById', id],
		queryFn: () => getTaskById(id)
	})
