"use client"

import { useUnit } from "effector-react"
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from "nuqs"
import { useMemo } from "react"

import { FlipButton } from "@/components/animate-ui/buttons/flip"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/components/animate-ui/radix/tabs"

import { TaskItem } from "./TasksItem"
import type { TastStatuses } from "./types"
import { TASK_CONFIG } from "@/configs/task.config"
import { $sortType, $tasks, sortTypeUpdated } from "@/stores/task/store"

export const TaskStatusFilter = [
	"all",
	"not-started",
	"completed",
	"in-progress"
] as const

export function TaskList() {
	const DISPLAYED_TASKS_LIMIT = TASK_CONFIG.DISPLAYED_TASKS_LIMIT
	const tasks = useUnit($tasks)
	const sortType = useUnit($sortType)
	const [status, setStatus] = useQueryState<TastStatuses | "all">(
		"status",
		parseAsStringLiteral(TaskStatusFilter).withDefault("all")
	)
	const [showAll, setShowAll] = useQueryState("show-all", parseAsBoolean)

	const filteredTasks = useMemo(() => {
		const filtered =
			status === "all" ? tasks : tasks.filter(task => task.status === status)

		const sorted = [...filtered].sort((a, b) => {
			const aDue = a.dueInDays ?? Infinity
			const bDue = b.dueInDays ?? Infinity

			return sortType === "asc" ? aDue - bDue : bDue - aDue
		})

		return sorted
	}, [status, tasks, sortType])

	const displayedTasks = useMemo(() => {
		return showAll
			? filteredTasks
			: filteredTasks.slice(0, DISPLAYED_TASKS_LIMIT)
	}, [DISPLAYED_TASKS_LIMIT, filteredTasks, showAll])

	const hasMoreTasks = filteredTasks.length > DISPLAYED_TASKS_LIMIT

	const toggleShowAll = () => {
		setShowAll(prev => !prev)
	}

	const changeSortType = () => {
		const newSortType = sortType === "asc" ? "desc" : "asc"
		console.log(sortType)
		sortTypeUpdated(newSortType)
	}

	return (
		<Tabs
			defaultValue={status}
			dir="rtl"
			onValueChange={value => setStatus(value as TastStatuses | "all")}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TabsList dir="ltr">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="completed">Completed</TabsTrigger>
						<TabsTrigger value="in-progress">In Progress</TabsTrigger>
						<TabsTrigger value="not-started">Not started</TabsTrigger>
					</TabsList>
					<FlipButton
						frontText="Farthest"
						backText="Soonest"
						flipped={sortType == "asc"}
						onClick={changeSortType}
						className="rounded-lg shadow"
					/>
				</div>
				<h4 className="font-geist-sans scroll-m-20 text-xl font-semibold tracking-tight">
					Last Tasks{" "}
					<span className="text-accent-foreground/60">
						({filteredTasks.length})
					</span>
				</h4>
			</div>

			<TabsContent value={status} className="grid grid-cols-3 gap-5" dir="ltr">
				{displayedTasks.map(task => (
					<TaskItem key={task.id} item={task} />
				))}
			</TabsContent>

			{hasMoreTasks && (
				<div className="font-geist-sans mt-5 text-center font-medium">
					<button
						onClick={toggleShowAll}
						className={`cursor-pointer ${
							showAll
								? "text-accent-foreground hover:text-accent-foreground/80"
								: "text-primary hover:text-primary/80"
						}`}
					>
						{showAll ? "Show less" : `Show all ${filteredTasks.length} tasks`}
					</button>
				</div>
			)}
		</Tabs>
	)
}
