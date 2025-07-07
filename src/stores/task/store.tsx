import { combine, createEvent, createStore } from "effector"
import { produce } from "immer"

import type { ITask } from "@/components/sidebar/dashboard/last-tasks/types"

import { TASKS } from "@/shared/data/tasks.data"

const STORAGE_KEYS = {
	SORT_TYPE: "sortType"
} as const

export const TaskStatusFilter = [
	"all",
	"not-started",
	"completed",
	"in-progress"
] as const

type TSortType = "asc" | "desc"

export type TTaskStatusFilter = (typeof TaskStatusFilter)[number]

// UTILITIES
const getSortTypeFromLS = () => {
	if (typeof window === "undefined") return "asc"
	return localStorage.getItem(STORAGE_KEYS.SORT_TYPE) === "desc"
		? "desc"
		: "asc"
}

const saveSortTypeToLS = (sortType: TSortType): void => {
	if (typeof window !== "undefined") {
		localStorage.setItem(STORAGE_KEYS.SORT_TYPE, sortType)
	}
}

const sortTasks = (tasks: ITask[], sortType: TSortType): ITask[] => {
	return [...tasks].sort((a, b) => {
		const aDue = a.dueDate ? a.dueDate.getTime() : Infinity
		const bDue = b.dueDate ? b.dueDate.getTime() : Infinity
		return sortType === "asc" ? aDue - bDue : bDue - aDue
	})
}

// STORES
export const $sortType = createStore<TSortType>(getSortTypeFromLS())
export const $statusType = createStore<TTaskStatusFilter>("all")
export const $tasks = createStore<ITask[]>(TASKS)

// COMBINE STORES
export const $sortedTasks = combine($tasks, $sortType, (tasks, sortType) =>
	sortTasks(tasks, sortType)
)

export const $filteredTasks = combine(
	$sortedTasks,
	$statusType,
	(tasks, status) =>
		status === "all" ? tasks : tasks.filter(t => t.status === status)
)

// EVENTS
export const sortTypeUpdated = createEvent<TSortType>()
export const statusTypeUpdated = createEvent<TTaskStatusFilter>()
export const taskDeleted = createEvent<string>()
export const taskUpdated = createEvent<Partial<ITask> & { id: string }>()
export const $getTaskByID = $tasks.map(
	tasks => (id: string) => tasks.find(task => task.id === id)
)

$sortType.on(sortTypeUpdated, (_, newSortType) => {
	saveSortTypeToLS(newSortType)
	return newSortType
})

$statusType.on(statusTypeUpdated, (_, newStatusType) => {
	return newStatusType
})

$tasks.on(taskUpdated, (tasks, updatedTask) =>
	produce(tasks, draft => {
		const task = draft.find(t => t.id === updatedTask.id)
		if (task) {
			Object.assign(task, updatedTask)
		}
	})
)

$tasks.on(taskDeleted, (tasks, taskId) =>
	tasks.filter(task => task.id !== taskId)
)

export const $numTasksByStatus = $tasks.map(tasks => {
	const stats = {
		all: tasks.length,
		completed: 0,
		"in-progress": 0,
		"not-started": 0
	}

	tasks.forEach(task => stats[task.status]++)
})
