'use client'

import type { User } from 'better-auth'
import type { ComponentProps } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail
} from '@/components/animate-ui/radix/sidebar'

import { useUser } from '@/utils/hooks/auth/useUser'

import { Account } from '@/app/(components)/Sidebar/components/Account/Account'
import { SidebarItem } from '@/app/(components)/Sidebar/components/SidebarItem/SidebarItem'
import { SIDEBAR_MENU_DATA } from '@/app/(components)/Sidebar/constants/data'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const { currentUser, isPending } = useUser()

	return (
		<Sidebar
			collapsible='offcanvas'
			className='overflow-hidden'
			{...props}
		>
			<SidebarHeader className='mb-0 pb-0'>
				<Account
					currentUser={currentUser as User}
					isPending={isPending}
				/>
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
