"use client"

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
import { Tasks } from "./data"

export const TTaskStatus = [
	"all",
	"not-started",
	"completed",
	"in-progress"
] as const

type TaskStatus = (typeof TTaskStatus)[number]

const TASKS_LIMIT = 6

export function TaskList() {
	const [status, setStatus] = useQueryState<TaskStatus>(
		"status",
		parseAsStringLiteral(TTaskStatus).withDefault("all")
	)
	const [sortDueAsc, setSortDueAsc] = useQueryState("sort", parseAsBoolean)
	const [showAll, setShowAll] = useQueryState("show-all", parseAsBoolean)

	const filteredTasks = useMemo(() => {
		const filtered =
			status === "all"
				? Tasks
				: Tasks.filter(task => task.progress.status === status)

		const sorted = filtered.sort((a, b) => {
			const aDue = a.dueInDays ?? Infinity
			const bDue = b.dueInDays ?? Infinity

			return sortDueAsc ? aDue - bDue : bDue - aDue
		})

		return sorted
	}, [status, sortDueAsc])

	const displayedTasks = useMemo(() => {
		return showAll ? filteredTasks : filteredTasks.slice(0, TASKS_LIMIT)
	}, [filteredTasks, showAll, sortDueAsc])

	const hasMoreTasks = filteredTasks.length > TASKS_LIMIT

	const toggleShowAll = () => {
		setShowAll(prev => !prev)
	}

	const handleSortByDue = () => {
		setSortDueAsc(prev => !prev)
	}

	return (
		<Tabs
			defaultValue={status}
			dir="rtl"
			onValueChange={value => setStatus(value as TaskStatus)}
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
						flipped={sortDueAsc as boolean}
						onClick={handleSortByDue}
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

			<TabsContent
				value={status}
				key={sortDueAsc ? "asc" : "desc"}
				className="grid grid-cols-3 gap-5"
				dir="ltr"
			>
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
