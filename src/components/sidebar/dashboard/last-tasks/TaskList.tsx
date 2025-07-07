"use client"

import { useUnit } from "effector-react"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import { Tabs } from "@/components/animate-ui/radix/tabs"

import { TaskListContent } from "./TaskListContent"
import { TaskListHeader } from "./TaskListHeader"
import { $statusType, statusTypeUpdated } from "@/stores/task/store"
import { TaskStatusFilter, type TaskStatuses } from "@/types/task.types"

export function TaskList() {
	const statusType = useUnit($statusType)
	const updateStatusType = useUnit(statusTypeUpdated)

	const [, setUrlStatus] = useQueryState<TaskStatuses>(
		"status",
		parseAsStringLiteral(TaskStatusFilter).withDefault("all")
	)

	const changeStatusType = (value: string) => {
		const newType = value as TaskStatuses
		setUrlStatus(newType)
		updateStatusType(newType)
	}

	return (
		<Tabs defaultValue={statusType} dir="rtl" onValueChange={changeStatusType}>
			<TaskListHeader />
			<TaskListContent />
		</Tabs>
	)
}
