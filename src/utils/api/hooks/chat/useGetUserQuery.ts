import { useQuery } from '@tanstack/react-query'

import { getUser } from '../../requests/client'

export const useGetUserQuery = (userId: string) =>
	useQuery({
		queryKey: ['getUser', userId],
		queryFn: async () => await getUser(userId),
		placeholderData: prev => prev
	})
