import type { HammerProps } from "@/components/animate-ui/icons/hammer-icon"
import type { StarProps } from "@/components/animate-ui/icons/star"

export type User = {
	name: string
	src: string
}

export type Task = {
	id: string
	title: string
	image: (props: StarProps & HammerProps) => React.ReactElement
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
