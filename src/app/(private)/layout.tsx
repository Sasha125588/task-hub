import type { PropsWithChildren } from 'react'

import { SidebarProvider } from '@/components/animate-ui/radix/sidebar'
import { SidebarInset } from '@/components/animate-ui/radix/sidebar'
import { Header } from '@/components/layout/Header/Header'
import { AppSidebar } from '@/components/layout/Sidebar/Sidebar'

import { getFromCookies } from '@/utils/helpers/cookies/getFromCookies'

export default async function SidebarLayout({ children }: PropsWithChildren) {
	const sidebarState = (await getFromCookies('sidebar_state')) === 'true'
	return (
		<SidebarProvider defaultOpen={sidebarState}>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<Header />
				<main className='h-full flex-1 px-5 py-5'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
