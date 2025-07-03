import type { ReactNode } from "react"

import {
	SidebarInset,
	SidebarProvider
} from "@/components/animate-ui/radix/sidebar"
import { Header } from "@/components/layout/sidebar/Header"
import { AppSidebar } from "@/components/layout/sidebar/Sidebar"

interface Props {
	children: ReactNode
}

export default function SidebarLayout({ children }: Props) {
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
