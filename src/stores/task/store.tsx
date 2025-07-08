import { combine, createEvent, createStore } from "effector"
import { produce } from "immer"

import { TASK_CONFIG } from "@/configs/task.config"
import { TASKS } from "@/shared/data/tasks.data"
import type {
	ITask,
	TStatusFilter,
	TaskSortType,
	subTask
} from "@/types/task.types"

const SORT_TYPE = TASK_CONFIG.STORAGE_KEYS.SORT_TYPE

// UTILITIES
const getSortTypeFromLS = () => {
	if (typeof window === "undefined") return "asc"
	return localStorage.getItem(SORT_TYPE) === "desc" ? "desc" : "asc"
}

const saveSortTypeToLS = (sortType: TaskSortType): void => {
	if (typeof window !== "undefined") {
		localStorage.setItem(SORT_TYPE, sortType)
	}
}

const sortTasks = (tasks: ITask[], sortType: TaskSortType): ITask[] => {
	return [...tasks].sort((a, b) => {
		const aDue = a.dueDate ? a.dueDate.getTime() : Infinity
		const bDue = b.dueDate ? b.dueDate.getTime() : Infinity
		return sortType === "asc" ? aDue - bDue : bDue - aDue
	})
}

// STORES
export const $sortType = createStore<TaskSortType>(getSortTypeFromLS())
export const $statusType = createStore<TStatusFilter>("all")
export const $tasks = createStore<ITask[]>(TASKS)
export const $curTaskId = createStore<string>("")

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
export const sortTypeUpdated = createEvent<TaskSortType>()
export const statusTypeUpdated = createEvent<TStatusFilter>()
export const taskDeleted = createEvent<string>()
export const taskUpdated = createEvent<Partial<ITask> & { id: string }>()
export const $getTaskByID = $tasks.map(
	tasks =>
		(id: string): ITask | undefined =>
			tasks.find(task => task.id === id)
)
export const curTaskIdUpdated = createEvent<string>()
export const subTaskCreated = createEvent<{
	subTask: subTask
	taskId: string
}>()
export const subTasksReorderer = createEvent<{
	taskId: string
	subTasks: subTask[]
}>()

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
			Object.assign(task, {
				title: updatedTask.title,
				dueDate: updatedTask.dueDate,
				iconName: updatedTask.iconName
			})
		}
	})
)

$tasks.on(taskDeleted, (tasks, taskId) =>
	tasks.filter(task => task.id !== taskId)
)

$curTaskId.on(curTaskIdUpdated, (_, newId) => newId)

$tasks.on(subTaskCreated, (tasks, { taskId, subTask }) =>
	produce(tasks, draft => {
		const task = draft.find(t => t.id === taskId)
		if (task) {
			if (!task.subTasks) {
				task.subTasks = []
			}
			task.subTasks.push(subTask)
		}
	})
)

$tasks.on(subTasksReorderer, (tasks, { taskId, subTasks }) =>
	produce(tasks, draft => {
		const task = draft.find(t => t.id === taskId)
		if (task) {
			task.subTasks = subTasks
		}
	})
)

export const $numTasksByStatus = $tasks.map(tasks => {
	const stats = {
		all: tasks.length,
		completed: 0,
		"in-progress": 0,
		"not-started": 0
	}

	tasks.forEach(task => stats[task.status]++)

	return stats
})
