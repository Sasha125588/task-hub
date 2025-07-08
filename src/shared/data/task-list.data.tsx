import type { ITabs } from "@/types/task-list.types"

export const TABS: ITabs[] = [
	{ title: "All", value: "all" },
	{ title: "Completed", value: "completed" },
	{ title: "In Progress", value: "in-progress" },
	{ title: "Not started", value: "not-started" }
] as const
