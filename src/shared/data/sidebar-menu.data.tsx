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

import type { SidebarData } from "@/components/layout/sidebar/types"

import {
	DASHBOARD_URL,
	INSIGHT_URL,
	MESSAGE_URL,
	REPORT_URL,
	SCHEDULE_URL,
	SETTINGS_URL,
	TEAM_URL
} from "@/constants"

export const SIDEBAR_MENU_DATA: SidebarData = {
	navMain: [
		{
			title: "Main Menu",
			items: [
				{
					title: "Dashboard",
					url: DASHBOARD_URL,
					icon: <LayoutDashboard />
				},
				{
					title: "Message",
					url: MESSAGE_URL,
					icon: <MessageCircle />
				},
				{
					title: "Insight",
					url: INSIGHT_URL,
					icon: <BarChart3 />
				},
				{
					title: "Team",
					url: TEAM_URL,
					icon: <Users />
				},
				{
					title: "Schedule",
					url: SCHEDULE_URL,
					icon: <Calendar />
				},
				{
					title: "Report",
					url: REPORT_URL,
					icon: <FileText />
				},
				{
					title: "Settings",
					url: SETTINGS_URL,
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
