import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { ChannelsSidebar } from './(components)/ChannelsSidebar/ChannelsSidebar'

export const metadata: Metadata = {
	title: 'Messages'
}

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<div className='mt-[-20px] mr-[-20px] ml-[-20px] flex h-[calc(100%+40px)] w-[calc(100%+40px)]'>
			<div className='border-border w-56 border-r'>
				<ChannelsSidebar />
			</div>

			<div className='flex-1'>{children}</div>
		</div>
	)
}
