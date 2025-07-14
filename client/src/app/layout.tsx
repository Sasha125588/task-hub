import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { type ReactNode } from 'react'

import './globals.css'
import { Providers } from './providers'
import { PAGES_CONFIG } from '@/configs/pages.config'

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
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body
				id='modal-root'
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
