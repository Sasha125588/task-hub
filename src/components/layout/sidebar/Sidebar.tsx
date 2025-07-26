import type { ComponentProps } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail
} from '@/components/animate-ui/radix/sidebar'
import { SIDEBAR_MENU_DATA } from '@/components/layout/Sidebar/constants/data/sidebar-menu.data'

import { Account } from './Account'
import { SidebarItem } from './SidebarItem'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible='offcanvas'
			className='overflow-hidden'
			{...props}
		>
			<SidebarHeader className='mb-0 pb-0'>
				<Account />
			</SidebarHeader>
			<SidebarContent className='gap-2 overflow-hidden'>
				{SIDEBAR_MENU_DATA.navMain.map(item => (
					<SidebarItem
						key={item.title}
						item={item}
					/>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
