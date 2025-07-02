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
} from "@/components/ui/sidebar"

import { Account } from "./Account"
import { SidebarItem } from "./SidebarItem"

export interface DataBlock {
	title: string
	url?: string
	component?: React.ReactNode
	items?: Item[]
}

interface DataStructure {
	navMain: DataBlock[]
}

interface Item {
	title: string
	icon: React.ReactNode
	url?: string
	color?: string
}

// This is sample data.
const data: DataStructure = {
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
					color: "text-purple-500"
				},
				{
					title: "Mobile App",
					icon: <Smartphone />,
					color: "text-pink-500"
				},
				{
					title: "Dashboard",
					icon: <BarChart />,
					color: "text-yellow-500"
				},
				{
					title: "Flyer",
					icon: <FileImage />,
					color: "text-orange-500"
				},
				{
					title: "Branding",
					icon: <Palette />,
					color: "text-teal-600"
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
