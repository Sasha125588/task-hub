import type { DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'

import type { DBSubTask } from '@/types/db.types'

import { usePostCreateSubTaskMutation } from '@/utils/api/hooks/task/usePostCreateSubTaskMutation'
import { usePostReorderSubTasksMutation } from '@/utils/api/hooks/task/usePostReorderSubTasksMutation'

export function useSubTasksList(taskId: string, subTasks: DBSubTask[]) {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')

	const createSubTask = usePostCreateSubTaskMutation().mutate
	const reorderSubTasks = usePostReorderSubTasksMutation().mutate

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (!active || !over || !subTasks) return
		if (active.id === over.id) return

		const oldIndex = subTasks.findIndex(t => t.id === active.id)
		const newIndex = subTasks.findIndex(t => t.id === over.id)

		if (oldIndex !== -1 && newIndex !== -1) {
			reorderSubTasks({
				subTasks,
				sourceIndex: oldIndex,
				destinationIndex: newIndex
			})
		}
	}

	const handleCreateTask = () => {
		if (taskTitle.trim()) {
			createSubTask({ taskId, body: { title: taskTitle.trim(), completed: false } })
			setTaskTitle('')
			setShowForm(false)
		}
	}

	const handleCancel = () => {
		setTaskTitle('')
		setShowForm(false)
	}

	const handleShowForm = () => {
		setShowForm(true)
	}

	return {
		state: {
			showForm,
			taskTitle
		},
		actions: {
			setTaskTitle,
			setShowForm
		},
		handlers: {
			handleDragEnd,
			handleCreateTask,
			handleCancel,
			handleShowForm
		}
	}
}
