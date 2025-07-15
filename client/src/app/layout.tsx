import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import { type ReactNode } from 'react'

import './globals.css'
import { Providers } from './providers'
import { PAGES_CONFIG } from '@/configs/pages.config'
import { getMessagesByLocale } from '@/lib/helpers/i18n/getMessageByLocale'

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

export default async function RootLayout({ children }: Props) {
	const cookieStore = await cookies()
	const locale = cookieStore.get('locale')?.value ?? 'ru'
	const messages = getMessagesByLocale(locale)
	return (
		<html
			lang={locale}
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
