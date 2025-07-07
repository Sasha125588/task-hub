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
import {
	$filteredTasks,
	$sortType,
	$statusType,
	type TTaskStatusFilter,
	TaskStatusFilter,
	sortTypeUpdated,
	statusTypeUpdated
} from "@/stores/task/store"

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
] as const

export function TaskList() {
	const tasks = useUnit($filteredTasks)
	const sortType = useUnit($sortType)
	const statusType = useUnit($statusType)
	const updateStatusType = useUnit(statusTypeUpdated)

	const [, setUrlStatus] = useQueryState<TTaskStatusFilter>(
		"status",
		parseAsStringLiteral(TaskStatusFilter).withDefault("all")
	)
	const [isShowAll, setIsShowAll] = useQueryState("show-all", parseAsBoolean)

	const displayedTasks = useMemo(() => {
		return isShowAll ? tasks : tasks.slice(0, DISPLAYED_TASKS_LIMIT)
	}, [tasks, isShowAll])

	const hasMoreTasks = tasks.length > DISPLAYED_TASKS_LIMIT

	const toggleShowAll = () => {
		setIsShowAll(!isShowAll)
	}

	const changeSortType = () => {
		const newSortType = sortType === "asc" ? "desc" : "asc"
		sortTypeUpdated(newSortType)
	}

	const changeStatusType = (value: string) => {
		const newType = value as TTaskStatusFilter
		setUrlStatus(newType)
		updateStatusType(newType)
	}

	return (
		<Tabs defaultValue={statusType} dir="rtl" onValueChange={changeStatusType}>
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
						frontText={TASK_CONFIG.FLIP_BUTTON_CONFIG.frontText}
						backText={TASK_CONFIG.FLIP_BUTTON_CONFIG.backText}
						flipped={sortType == "asc"}
						onClick={changeSortType}
						className="rounded-lg shadow"
					/>
				</div>
				<h4 className="font-geist-sans scroll-m-20 text-xl font-semibold tracking-tight">
					Last Tasks{" "}
					<span className="text-accent-foreground/60">({tasks.length})</span>
				</h4>
			</div>

			<TabsContent value={statusType} dir="ltr">
				<motion.div layout className="grid grid-cols-3 gap-5">
					<AnimatePresence initial={false}>
						{displayedTasks.map(task => (
							<motion.div
								key={task.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{
									opacity: 0,
									scale: 0.9
								}}
								layout
								whileHover={{ y: -2 }}
								transition={{
									duration: 0.2,
									ease: "easeOut",
									layout: { duration: 0.3 }
								}}
							>
								<TaskItem item={task} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
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
							<div>Show all {tasks.length} tasks</div>
						)}
					</button>
				</div>
			)}
		</Tabs>
	)
}
