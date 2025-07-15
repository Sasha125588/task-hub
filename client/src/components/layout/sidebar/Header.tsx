'use client'

import { usePathname } from 'next/navigation'

import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'

import { SearchForm } from './Search'

export function Header() {
	const pathname = usePathname()

	const pageName =
		pathname.split('/')[1][0].charAt(0).toLocaleUpperCase('uk-UA') +
		pathname.split('/')[1].slice(1)

	return (
		<header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3 text-3xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16'>
			<div className='flex w-full items-center gap-2 px-4 font-medium'>
				<SidebarTrigger className='-ml-1 cursor-pointer' />
				<Separator
					orientation='vertical'
					className='mr-2 data-[orientation=vertical]:h-4'
				/>
				{pageName}
			</div>
			<div className='flex items-center gap-3'>
				<SearchForm />
				<ModeToggle />
			</div>
		</header>
	)
}
