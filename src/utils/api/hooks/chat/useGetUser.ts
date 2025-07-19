import { useQuery } from '@tanstack/react-query'

import { getUser } from '../../requests'

export const useGetUser = (userId: string) =>
	useQuery({
		queryKey: ['getUser', userId],
		queryFn: () => getUser(userId),
		placeholderData: prev => prev
	})
