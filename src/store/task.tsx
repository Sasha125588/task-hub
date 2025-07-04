import { createEvent, createStore } from "effector"
import { produce } from "immer"

import { TASKS } from "@/components/sidebar/dashboard/last-tasks/data"
import type { ITask } from "@/components/sidebar/dashboard/last-tasks/types"

export const $tasks = createStore<ITask[]>(TASKS)
export const taskUpdated = createEvent<Partial<ITask> & { id: string }>()

$tasks.on(taskUpdated, (tasks, updatedTask) =>
	produce(tasks, draft => {
		const task = draft.find(t => t.id === updatedTask.id)
		if (task) {
			Object.assign(task, updatedTask)
		}
	})
)

const getSortTypeFromLS = (): "asc" | "desc" => {
	if (typeof window === "undefined") return "asc"
	return localStorage.getItem("sortType") === "desc" ? "desc" : "asc"
}

export const $sortType = createStore<"asc" | "desc">(getSortTypeFromLS())
export const sortTypeUpdated = createEvent<"asc" | "desc">()

$sortType.on(sortTypeUpdated, (_, newSortType) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("sortType", newSortType)
	}
	return newSortType
})
