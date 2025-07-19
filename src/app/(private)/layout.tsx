import type { PropsWithChildren } from 'react'

import { SidebarProvider } from '@/components/animate-ui/radix/sidebar'
import { SidebarInset } from '@/components/animate-ui/radix/sidebar'
import { Header } from '@/components/layout/Header/Header'
import { AppSidebar } from '@/components/layout/sidebar/Sidebar'

export default function SidebarLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<Header />
				<main className='h-full px-5 py-5'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
