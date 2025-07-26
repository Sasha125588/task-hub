'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/animate-ui/radix/sidebar'

import { useI18n } from '@/utils/providers'

import type { SidebarSection } from './types'

export function SidebarItem({ item }: { item: SidebarSection }) {
	const pathname = usePathname()
	const pageName = pathname === '/' ? '/' : '/' + pathname.split('/')[1]
	const i18n = useI18n()
	return (
		<SidebarGroup key={item.title}>
			<SidebarGroupLabel className='my-0 py-0'>
				<p className='text-xs leading-7 [&:not(:first-child)]:mt-6'>
					{i18n.formatMessage({
						id: `sidebar.menu.${item.title}`
					})}
				</p>
			</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{item.items &&
						item.items.map(item => {
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										size='lg'
										className='px-3'
										asChild
										isActive={!!match(item.url)(pageName)}
									>
										<Link
											href={item.url}
											className='flex items-center gap-3'
										>
											<div className={`m-0 flex h-5 w-5 items-center p-0`}>{item.icon}</div>
											<p className='text-sm font-normal'>
												{i18n.formatMessage({
													id: `sidebar.menu.${item.title}`
												})}
											</p>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)
						})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
