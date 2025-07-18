import type { PropsWithChildren } from 'react'

import { ChannelsSidebar } from './(components)/ChannelsSidebar/ChannelsSidebar'

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<div className='mt-[-20px] mr-[-20px] mb-[-20px] ml-[-20px] flex h-screen'>
			<div className='border-border w-64 border-r'>
				<ChannelsSidebar />
			</div>

			<div className='flex-1'>{children}</div>
		</div>
	)
}
