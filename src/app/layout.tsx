import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import { type PropsWithChildren } from 'react'

import { ThemeSwitcher } from '@/components/common/ThemeSwitcher'

import { getMessagesByLocale } from '@/utils/helpers/i18n/getMessageByLocale'

import './globals.css'
import { Providers } from './providers'
import { PAGES_CONFIG } from '@/configs/pages.config'

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
	title: {
		absolute: PAGES_CONFIG.SITE_NAME,
		template: `${PAGES_CONFIG.SITE_NAME} - %s`
	},
	icons: {
		icon: '/images/favicon.ico',
		shortcut: '/images/favicon.ico'
	},
	description: 'Manage your progress'
}

export default async function RootLayout({ children }: PropsWithChildren) {
	const cookieStore = await cookies()
	const locale = cookieStore.get('locale')?.value ?? 'en'
	const messages = getMessagesByLocale(locale)
	return (
		<html
			lang={locale}
			suppressHydrationWarning
		>
			<body
				id='modal-root'
				className={`${poppins.variable} antialiased`}
			>
				<Providers i18n={{ locale, messages }}>
					{children}
					<ThemeSwitcher />
				</Providers>
			</body>
		</html>
	)
}
