import { type PropsWithChildren } from 'react'

import { useUser } from '@/utils/hooks/useUser'

import { LoadingSpinner } from '../../ui/loading-spinner'

export function AuthLoader({ children }: PropsWithChildren) {
	const { isPending } = useUser()

	if (isPending) {
		return <LoadingSpinner />
	}

	return <>{children}</>
}
