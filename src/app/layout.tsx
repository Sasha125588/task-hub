import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { PropsWithChildren } from "react"

import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"
import { SITE_NAME } from "@/constants"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	icons: {
		icon: "/images/favicon.ico",
		shortcut: "/images/favicon.ico"
	},
	title: {
		absolute: SITE_NAME,
		template: `${SITE_NAME} - %s`
	},
	description: "Manage your progress"
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ScrollProgress />
					{children}
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
