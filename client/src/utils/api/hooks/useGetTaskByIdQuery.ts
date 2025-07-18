import { useQuery } from '@tanstack/react-query'

import { getTaskById } from '../requests'

export const useGetTaskById = (id: string) =>
	useQuery({
		queryKey: ['getTaskById', id],
		queryFn: () => getTaskById(id)
	})
