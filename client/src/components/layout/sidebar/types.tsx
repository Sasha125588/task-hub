export interface SidebarSection {
	title: string
	items?: SidebarMenuItem[]
}

export interface SidebarData {
	navMain: SidebarSection[]
}

export interface SidebarMenuItem {
	title: string
	icon: React.ReactNode
	url: string
	color?: string
}
