import type { Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
	title: "Dashboard"
}

interface Props {
	children: ReactNode
	modal: ReactNode
}
export default function DashboardLayout({ children, modal }: Props) {
	return (
		<div>
			{children}
			{modal}
		</div>
	)
}
