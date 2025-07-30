import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: 'Reports'
}

export default function ReportsLayout({ children }: PropsWithChildren) {
	return <div>{children}</div>
}
