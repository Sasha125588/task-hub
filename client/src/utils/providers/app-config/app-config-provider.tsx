import { Analytics } from '@vercel/analytics/react'
import type { PropsWithChildren } from 'react'

import { ScrollProgress } from '@/components/animate-ui/components/scroll-progress'
import { AuthLoader } from '@/components/layout/auth/AuthLoader'
import { Toaster } from '@/components/ui/sonner'

export function AppConfigProvider({ children }: PropsWithChildren) {
	return (
		<>
			<Analytics />
			<ScrollProgress />
			<Toaster
				richColors
				duration={1500}
			/>
			<AuthLoader>{children}</AuthLoader>
		</>
	)
}
