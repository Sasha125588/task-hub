"use client"

import { useUnit } from "effector-react"
import { useEffect } from "react"

import { TaskEditForm } from "@/components/forms/TaskForm"
import { TaskModal } from "@/components/modals/TaskModal"

import { curTaskIdUpdated } from "@/stores/task/store"

interface Props {
	id: string
}

export function TastEdit({ id }: Props) {
	const setTaskId = useUnit(curTaskIdUpdated)

	useEffect(() => {
		setTaskId(id)
	}, [id, setTaskId])

	return (
		<TaskModal>
			<TaskEditForm />
		</TaskModal>
	)
}
