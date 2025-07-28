'use client'

import type { DragEndEvent } from '@dnd-kit/core'
import { type KeyboardEvent, useState } from 'react'

import type { DBSubTask } from '@/types/db.types'

import {
	useDeleteSubTaskMutation,
	usePostCreateSubTaskMutation,
	usePostReorderSubTasksMutation,
	usePutUpdateSubTaskMutation
} from '@/utils/api/hooks/task'

export function useSubTasksList(taskId: string, subTasks: DBSubTask[]) {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')

	const createSubTaskMutation = usePostCreateSubTaskMutation()
	const updateSubTaskMutation = usePutUpdateSubTaskMutation()
	const deleteSubTaskMutation = useDeleteSubTaskMutation()
	const reorderSubTasksMutation = usePostReorderSubTasksMutation()

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (!active || !over || !subTasks) return
		if (active.id === over.id) return

		const oldIndex = subTasks.findIndex(t => t.id === active.id)
		const newIndex = subTasks.findIndex(t => t.id === over.id)

		if (oldIndex !== -1 && newIndex !== -1) {
			reorderSubTasksMutation.mutate({
				subTasks,
				sourceIndex: oldIndex,
				destinationIndex: newIndex
			})
		}
	}

	const handleCreateTask = () => {
		if (taskTitle.trim()) {
			createSubTaskMutation.mutate(
				{ taskId, body: { title: taskTitle.trim() } },
				{
					onSuccess: () => {
						setTaskTitle('')
						setShowForm(false)
					}
				}
			)
		}
	}

	const handleUpdateSubTask = (subTaskId: string, completed: boolean) => {
		updateSubTaskMutation.mutate({ id: subTaskId, params: { completed } })
	}

	const handleDeleteSubTask = (subTaskId: string) => {
		deleteSubTaskMutation.mutate(subTaskId)
	}

	const handleCancel = () => {
		setTaskTitle('')
		setShowForm(false)
	}

	const handleShowForm = () => {
		setShowForm(true)
	}

	const handleEnterPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleCreateTask()
		}
	}

	return {
		state: {
			subTasks,
			showForm,
			taskTitle,
			isPending:
				createSubTaskMutation.isPending ||
				deleteSubTaskMutation.isPending ||
				reorderSubTasksMutation.isPending ||
				updateSubTaskMutation.isPending
		},
		actions: {
			setTaskTitle,
			setShowForm
		},
		handlers: {
			handleDragEnd,
			handleCreateTask,
			handleDeleteSubTask,
			handleCancel,
			handleShowForm,
			handleEnterPress,
			handleUpdateSubTask
		}
	}
}
