"use client"

import { useUnit } from "effector-react"
import { AnimatePresence, motion } from "motion/react"
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from "nuqs"
import { useMemo } from "react"

import { FlipButton } from "@/components/animate-ui/buttons/flip"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/components/animate-ui/radix/tabs"

import { TaskItem } from "./TaskItem"
import { TASK_CONFIG } from "@/configs/task.config"
import { $sortType, $tasks, sortTypeUpdated } from "@/stores/task/store"

export const TaskStatusFilter = [
	"all",
	"not-started",
	"completed",
	"in-progress"
] as const

type TTaskStatusFilter = (typeof TaskStatusFilter)[number]

const DISPLAYED_TASKS_LIMIT = TASK_CONFIG.DISPLAYED_TASKS_LIMIT

interface ITabs {
	title: string
	value: string
}

const TABS: ITabs[] = [
	{ title: "All", value: "all" },
	{ title: "Completed", value: "completed" },
	{ title: "In Progress", value: "in-progress" },
	{ title: "Not started", value: "not-started" }
]

export function TaskList() {
	const tasks = useUnit($tasks)
	const sortType = useUnit($sortType)

	const [status, setStatus] = useQueryState<TTaskStatusFilter>(
		"status",
		parseAsStringLiteral(TaskStatusFilter).withDefault("all")
	)
	const [isShowAll, setIsShowAll] = useQueryState("show-all", parseAsBoolean)

	const filteredTasks = useMemo(() => {
		const filtered =
			status === "all" ? tasks : tasks.filter(task => task.status === status)

		const sorted = [...filtered].sort((a, b) => {
			const aDue = a.dueDate ? a.dueDate.getTime() : Infinity
			const bDue = b.dueDate ? b.dueDate.getTime() : Infinity

			return sortType === "asc" ? aDue - bDue : bDue - aDue
		})

		return sorted
	}, [status, tasks, sortType])

	const displayedTasks = useMemo(() => {
		return isShowAll
			? filteredTasks
			: filteredTasks.slice(0, DISPLAYED_TASKS_LIMIT)
	}, [filteredTasks, isShowAll])

	const hasMoreTasks = filteredTasks.length > DISPLAYED_TASKS_LIMIT

	const toggleShowAll = () => {
		setIsShowAll(!isShowAll)
	}

	const changeSortType = () => {
		const newSortType = sortType === "asc" ? "desc" : "asc"
		sortTypeUpdated(newSortType)
	}

	return (
		<Tabs
			defaultValue={status}
			dir="rtl"
			onValueChange={value => setStatus(value as TTaskStatusFilter)}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TabsList dir="ltr">
						{TABS.map(tab => {
							return (
								<TabsTrigger key={tab.value} value={tab.value}>
									{tab.title}
								</TabsTrigger>
							)
						})}
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
				<AnimatePresence mode="sync">
					{displayedTasks.map((task, index) => (
						<motion.div
							key={task.id}
							initial={{
								opacity: 0,
								y: 40,
								scale: 0.8,
								filter: "blur(8px)"
							}}
							animate={{
								opacity: 1,
								y: 0,
								scale: 1,
								filter: "blur(0px)",
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 20,
									delay: index * 0.1,
									filter: { duration: 0.4 }
								}
							}}
							exit={{
								opacity: 0,
								y: -30,
								scale: 0.85,
								filter: "blur(4px)",
								transition: {
									duration: 0.4,
									ease: [0.4, 0, 1, 1]
								}
							}}
							layout
							layoutId={task.id}
							whileHover={{
								y: -8,
								scale: 1.03,
								boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
								transition: { duration: 0.2 }
							}}
							className="will-change-transform"
						>
							<TaskItem item={task} />
						</motion.div>
					))}
				</AnimatePresence>
			</TabsContent>

			{hasMoreTasks && (
				<div className="font-geist-sans mt-5 text-center font-medium">
					<button
						onClick={toggleShowAll}
						className={`cursor-pointer ${
							isShowAll
								? "text-accent-foreground hover:text-accent-foreground/80"
								: "text-primary hover:text-primary/80"
						}`}
					>
						{isShowAll ? (
							<div>Show less</div>
						) : (
							<div>Show all {filteredTasks.length} tasks</div>
						)}
					</button>
				</div>
			)}
		</Tabs>
	)
}
