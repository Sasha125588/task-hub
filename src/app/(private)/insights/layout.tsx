import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: 'Insights'
}

export default function InsightsLayout({ children }: PropsWithChildren) {
	return <div>{children}</div>
}
