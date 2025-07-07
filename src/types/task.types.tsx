export const TaskStatusFilter = [
	"all",
	"not-started",
	"completed",
	"in-progress"
] as const

export type TaskSortType = "asc" | "desc"

export type TaskStatuses = (typeof TaskStatusFilter)[number]

export interface ITabs {
	title: string
	value: string
}
