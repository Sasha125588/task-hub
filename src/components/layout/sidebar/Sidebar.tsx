import {
	BarChart,
	BarChart3,
	Calendar,
	FileImage,
	FileText,
	LayoutDashboard,
	MessageCircle,
	Palette,
	Settings,
	Smartphone,
	Square,
	Users
} from "lucide-react"
import * as React from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail
} from "@/components/animate-ui/radix/sidebar"

import { Account } from "./Account"
import { SidebarItem } from "./SidebarItem"
import type { SidebarData } from "./types"

const data: SidebarData = {
	navMain: [
		{
			title: "Main Menu",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
					icon: <LayoutDashboard />
				},
				{
					title: "Message",
					url: "/message",
					icon: <MessageCircle />
				},
				{
					title: "Insight",
					url: "/insight",
					icon: <BarChart3 />
				},
				{
					title: "Team",
					url: "/team",
					icon: <Users />
				},
				{
					title: "Schedule",
					url: "/schedule",
					icon: <Calendar />
				},
				{
					title: "Report",
					url: "/report",
					icon: <FileText />
				},
				{
					title: "Settings",
					url: "/settings",
					icon: <Settings />
				}
			]
		},
		{
			title: "Projects",
			items: [
				{
					title: "Landing Page",
					icon: <Square />,
					color: "text-purple-500",
					url: "/projects/landing"
				},
				{
					title: "Mobile App",
					icon: <Smartphone />,
					color: "text-pink-500",
					url: "/projects/mobile"
				},
				{
					title: "Dashboard",
					icon: <BarChart />,
					color: "text-yellow-500",
					url: "/projects/dashboard"
				},
				{
					title: "Flyer",
					icon: <FileImage />,
					color: "text-orange-500",
					url: "/projects/flyer"
				},
				{
					title: "Branding",
					icon: <Palette />,
					color: "text-teal-600",
					url: "/projects/branding"
				}
			]
		}
	]
}

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
				{data.navMain.map(item => (
					<SidebarItem key={item.title} item={item} />
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
