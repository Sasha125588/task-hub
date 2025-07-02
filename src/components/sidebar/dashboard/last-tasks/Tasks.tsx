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
						{filteredTasks.map(task => {
							return (
								<div key={task.id} className="">
									<TaskItem item={task} />
								</div>
							)
						})}
					</TabsContent>
				</TabsContents>
			</Tabs>
		</>
	)
}
