import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type PropsWithChildren } from 'react'

import { AppConfigProvider } from '@/utils/providers/app-config-provider'
import { QueryProvider } from '@/utils/providers/query-provider'
import { ThemeProvider } from '@/utils/providers/theme-provider'

export function Providers({ children }: PropsWithChildren) {
	return (
		<QueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<NuqsAdapter>
					<AppConfigProvider>{children}</AppConfigProvider>
				</NuqsAdapter>
			</ThemeProvider>
		</QueryProvider>
	)
}
