'use client'

import { type PropsWithChildren } from 'react'

import { useUser } from '@/utils/hooks/auth/useUser'

import { LoadingSpinner } from '../ui/loading-spinner'

export function Loader({ children }: PropsWithChildren) {
	const { isPending } = useUser()

	if (isPending) {
		return <LoadingSpinner />
	}

	return <>{children}</>
}
