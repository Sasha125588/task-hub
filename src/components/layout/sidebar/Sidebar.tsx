import * as React from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail
} from "@/components/animate-ui/radix/sidebar"

import { Account } from "./Account"
import { SidebarItem } from "./SidebarItem"
import { SIDEBAR_MENU_DATA } from "@/shared/data/sidebar-menu.data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader className="mb-0 pb-0">
				<Account
					user={{
						name: "Test",
						email: "test@gmail.com"
					}}
				/>
			</SidebarHeader>
			<SidebarContent className="gap-2">
				{SIDEBAR_MENU_DATA.navMain.map(item => (
					<SidebarItem key={item.title} item={item} />
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
