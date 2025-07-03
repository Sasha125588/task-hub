"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/animate-ui/radix/sidebar"

import type { DataBlock } from "./Sidebar"

export function SidebarItem({ item }: { item: DataBlock }) {
	const pathname = usePathname()
	const pageName = "/" + pathname.split("/")[1]
	console.log(pageName)
	return (
		<SidebarGroup key={item.title}>
			<SidebarGroupLabel className="my-0 py-0">
				<p className="text-[13px] leading-7 [&:not(:first-child)]:mt-6">
					{item.title}
				</p>
			</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{item.items &&
						item.items.map(item => {
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										size="lg"
										className="px-3"
										asChild
										isActive={pageName === item.url}
									>
										<a href={item.url} className="flex items-center gap-3">
											<div className={`m-0 flex h-5 w-5 items-center p-0`}>
												{item.icon}
											</div>
											<p>{item.title}</p>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)
						})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
