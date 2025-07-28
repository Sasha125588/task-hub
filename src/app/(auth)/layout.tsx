import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

import { Background } from '@/components/common/Background'

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Auth'
}

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<Background>
			<div className='flex h-screen items-center justify-center'>{children}</div>
		</Background>
	)
}
