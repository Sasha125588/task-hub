import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

import { AuthBackground } from '@/components/layout/auth/AuthBackground'

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Auth'
}

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<AuthBackground>
			<div className='flex h-screen items-center justify-center'>{children}</div>
		</AuthBackground>
	)
}
