import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export interface User {
	name: string
	src: string
}

export type TastStatuses = "not-started" | "completed" | "in-progress"

export interface ITask {
	id: string
	title: string
	startTime?: string
	endTime?: string
	image: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>

	dueDate: Date
	users: User[]
	progress: number
	status: TastStatuses
	comments: number
	attachments: number
	links: number
}
