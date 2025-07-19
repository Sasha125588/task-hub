import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

import { GradientBackground } from '@/components/ui/background-gradient'

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Auth'
}

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<GradientBackground>
			<div className='flex h-screen items-center justify-center'>
				{children}
			</div>
		</GradientBackground>
	)
}
