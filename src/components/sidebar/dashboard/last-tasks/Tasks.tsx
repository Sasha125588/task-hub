"use client"

import { useMemo, useState } from "react"

import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger
} from "@/components/animate-ui/radix/tabs"

import { TaskItem } from "./TasksItem"
import { Tasks } from "./data"

export type TTastStatus = "not-started" | "completed" | "in-progress"

export function TasksList() {
	const [status, setStatus] = useState<TTastStatus | "all">("all")
	const [showAll, setShowAll] = useState(false)

	const TASKS_LIMIT = 6

	const filteredTasks = useMemo(() => {
		if (status == "all") return Tasks

		switch (status) {
			case "not-started":
				return Tasks.filter(
					task =>
						task.progress.status !== "completed" &&
						task.progress.status !== "in-progress"
				)
			case "completed":
				return Tasks.filter(task => task.progress.status === "completed")
			case "in-progress":
				return Tasks.filter(task => task.progress.status === "in-progress")
		}
	}, [status])

	const handleShowAllTasks = () => {
		setShowAll(prev => !prev)
	}

	const displayedFilteredTasks = showAll
		? filteredTasks
		: filteredTasks.slice(0, TASKS_LIMIT)

	const hasMoreTasks = filteredTasks.length > TASKS_LIMIT

	return (
		<>
			<Tabs defaultValue="all" dir="rtl">
				<div className="flex items-center justify-between">
					<TabsList dir="ltr">
						<TabsTrigger onClick={() => setStatus("all")} value="all">
							All
						</TabsTrigger>
						<TabsTrigger
							onClick={() => setStatus("completed")}
							value="completed"
						>
							Completed
						</TabsTrigger>
						<TabsTrigger
							onClick={() => setStatus("in-progress")}
							value="in-progress"
						>
							In Progress
						</TabsTrigger>
						<TabsTrigger
							onClick={() => setStatus("not-started")}
							value="not-started"
						>
							Not started
						</TabsTrigger>
					</TabsList>
					<h4 className="font-geist-sans scroll-m-20 text-xl font-semibold tracking-tight">
						Last Tasks <span className="text-zinc-400">(3)</span>
					</h4>
				</div>
				<TabsContents dir="ltr">
					<TabsContent
						value={status as string}
						className="grid grid-cols-3 gap-5"
					>
						{displayedFilteredTasks.map(task => {
							return (
								<div key={task.id} className="">
									<TaskItem item={task} />
								</div>
							)
						})}
					</TabsContent>

					<div className="font-geist-sans mt-5 font-medium">
						{!showAll && hasMoreTasks && (
							<div className="flex w-[100%] items-center justify-center">
								<div>
									<button
										onClick={handleShowAllTasks}
										className="text-primary hover:text-primary/80 cursor-pointer"
									>
										Show all {filteredTasks.length} tasks
									</button>
								</div>
							</div>
						)}

						{showAll && hasMoreTasks && (
							<div className="text-center">
								<button
									onClick={handleShowAllTasks}
									className="text-accent-foreground hover:text-accent-foreground/80 cursor-pointer"
								>
									Show less
								</button>
							</div>
						)}
					</div>
				</TabsContents>
			</Tabs>
		</>
	)
}
