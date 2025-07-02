"use client"

import { useMemo, useState } from "react"

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/components/animate-ui/radix/tabs"

import { TaskItem } from "./TasksItem"
import { Tasks } from "./data"

export type TTaskStatus = "all" | "not-started" | "completed" | "in-progress"

const TASKS_LIMIT = 6

export function TasksList() {
	const [status, setStatus] = useState<TTaskStatus>("all")
	const [showAll, setShowAll] = useState(false)

	const filteredTasks = useMemo(() => {
		if (status === "all") return Tasks
		return Tasks.filter(task => task.progress.status === status)
	}, [status])

	const displayedTasks = showAll
		? filteredTasks
		: filteredTasks.slice(0, TASKS_LIMIT)

	const hasMoreTasks = filteredTasks.length > TASKS_LIMIT

	const toggleShowAll = () => setShowAll(prev => !prev)

	return (
		<Tabs
			defaultValue="all"
			dir="rtl"
			onValueChange={value => setStatus(value as TTaskStatus)}
		>
			<div className="flex items-center justify-between">
				<TabsList dir="ltr">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="completed">Completed</TabsTrigger>
					<TabsTrigger value="in-progress">In Progress</TabsTrigger>
					<TabsTrigger value="not-started">Not started</TabsTrigger>
				</TabsList>

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
