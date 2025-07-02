import type { PropsWithChildren } from "react"

import {
	SidebarInset,
	SidebarProvider
} from "@/components/animate-ui/radix/sidebar"
import { Header } from "@/components/layout/sidebar/Header"
import { AppSidebar } from "@/components/layout/sidebar/Sidebar"

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 66)",
					"--header-height": "calc(var(--spacing) * 12)"
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<Header />
				<main className="h-full px-5 py-5">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
