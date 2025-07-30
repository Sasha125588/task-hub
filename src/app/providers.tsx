import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type PropsWithChildren } from 'react'

import { I18nProvider, type I18nProviderProps } from '@/utils/providers'
import { AppConfigProvider } from '@/utils/providers/app-config/appConfigProvider'
import { QueryProvider } from '@/utils/providers/query/queryProvider'
import { ThemeProvider } from '@/utils/providers/theme/themeProvider'

export function Providers({ i18n, children }: PropsWithChildren<{ i18n: I18nProviderProps }>) {
	return (
		<QueryProvider>
			<I18nProvider {...i18n}>
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
			</I18nProvider>
		</QueryProvider>
	)
}
