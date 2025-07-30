import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: 'Schedule'
}

export default function ScheduleLayout({ children }: PropsWithChildren) {
	return <div>{children}</div>
}
