import type { ITabs } from "@/components/sidebar/dashboard/last-tasks/TaskList"

export const TABS: ITabs[] = [
	{ title: "All", value: "all" },
	{ title: "Completed", value: "completed" },
	{ title: "In Progress", value: "in-progress" },
	{ title: "Not started", value: "not-started" }
] as const
