import React, { type ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

import type { Messages } from '@/lib/helpers/i18n/getMessageByLocale'

export interface I18nProviderProps {
	locale: string
	messages: Messages
	children?: ReactNode
}

export const I18nProvider = (props: I18nProviderProps) => (
	<IntlProvider
		{...props}
		defaultLocale='en'
		onError={err => {
			if (err.code === 'MISSING_DATA') {
				console.warn('Missing locale data:', err.message)
			}
		}}
	/>
)
