export interface SidebarSection {
	title: string
	items?: SidebarItem[]
}

export interface SidebarData {
	navMain: SidebarSection[]
}

export interface SidebarItem {
	title: string
	icon: React.ReactNode
	url: string
	color?: string
}
