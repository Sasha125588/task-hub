import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { type ReactNode } from 'react'

import './globals.css'
import { Providers } from './providers'
import { PAGES_CONFIG } from '@/configs/pages.config'
import { getMessagesByLocale } from '@/lib/helpers/getMessageByLocale'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: PAGES_CONFIG.SITE_NAME,
		template: `${PAGES_CONFIG.SITE_NAME} - %s`
	},
	description: 'Manage your progress'
}

interface Props {
	children: ReactNode
}

export default function RootLayout({ children }: Props) {
	const locale = 'ru'
	const messages = getMessagesByLocale(locale)
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body
				id='modal-root'
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers i18n={{ locale, messages }}>{children}</Providers>
			</body>
		</html>
	)
}
