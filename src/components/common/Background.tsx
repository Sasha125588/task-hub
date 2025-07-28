'use client'

import { useTheme } from 'next-themes'
import type { PropsWithChildren } from 'react'

import { GradientBackground } from '@/components/ui/background-gradient'

export function Background({ children }: PropsWithChildren) {
	const { theme } = useTheme()

	return (
		<GradientBackground color={theme === 'dark' ? 'dark' : 'light'}>{children}</GradientBackground>
	)
}
