import type { LucideProps } from "lucide-react"
import type { ComponentType } from "react"

import type { HammerProps } from "@/components/animate-ui/icons/hammer-icon"
import type { StarProps } from "@/components/animate-ui/icons/star"

export interface User {
	name: string
	src: string
}

export interface ITask {
	id: string
	title: string
	startTime?: string
	endTime?: string

	image: ComponentType<StarProps & LucideProps & HammerProps>
	dueInDays: number
	users: User[]
	progress: {
		value: number
		status: "not-started" | "completed" | "in-progress"
		color: string
	}
	comments: number
	attachments: number
	links: number
}
