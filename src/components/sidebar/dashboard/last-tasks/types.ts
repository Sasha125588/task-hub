import type { LucideIcon } from "lucide-react"

export interface User {
	name: string
	src: string
}

export type TastStatuses = "not-started" | "completed" | "in-progress"

export interface ITask {
	id: string
	title: string
	icon: LucideIcon
	iconName: string
	startTime?: string
	endTime?: string

	dueDate: Date
	users: User[]
	progress: number
	status: TastStatuses
	comments: number
	attachments: number
	links: number
}
