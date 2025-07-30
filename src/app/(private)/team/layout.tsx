import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: 'Team'
}

export default function TeamLayout({ children }: PropsWithChildren) {
	return <div>{children}</div>
}
