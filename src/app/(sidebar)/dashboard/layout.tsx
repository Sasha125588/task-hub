import type { ReactNode } from "react"

export default function DashboardLayout({
	children,
	task
}: {
	children: ReactNode
	task: ReactNode
}) {
	return (
		<>
			{task}
			{children}
		</>
	)
}
