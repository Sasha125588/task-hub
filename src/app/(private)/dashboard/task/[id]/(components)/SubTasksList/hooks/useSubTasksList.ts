'use client'

import type { DragEndEvent } from '@dnd-kit/core'
import { type KeyboardEvent, useEffect, useState, useTransition } from 'react'

import type { DBSubTask } from '@/types/db.types'

import { handleCreateSubTask } from '@/app/(private)/dashboard/task/[id]/(actions)/handleCreateSubTask'
import { handleReorderSubTasks } from '@/app/(private)/dashboard/task/[id]/(actions)/handleReorderSubTasks'

export function useSubTasksList(taskId: string, subTasks: DBSubTask[]) {
	const [optimisticSubTasks, setOptimisticSubTasks] = useState<DBSubTask[]>(subTasks)
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		setOptimisticSubTasks(subTasks)
	}, [subTasks])

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (!active || !over || !optimisticSubTasks) return
		if (active.id === over.id) return

		const oldIndex = optimisticSubTasks.findIndex(t => t.id === active.id)
		const newIndex = optimisticSubTasks.findIndex(t => t.id === over.id)

		if (oldIndex !== -1 && newIndex !== -1) {
			const newOptimisticSubTasks = [...optimisticSubTasks]
			const [movedItem] = newOptimisticSubTasks.splice(oldIndex, 1)

			newOptimisticSubTasks.splice(newIndex, 0, movedItem)
			setOptimisticSubTasks(newOptimisticSubTasks)

			startTransition(async () => {
				try {
					await handleReorderSubTasks({
						subTasks: optimisticSubTasks,
						sourceIndex: oldIndex,
						destinationIndex: newIndex,
						taskId
					})
				} catch (error) {
					console.error('Failed to reorder sub tasks:', error)
					setOptimisticSubTasks(optimisticSubTasks)
				}
			})
		}
	}

	const handleCreateTask = () => {
		if (taskTitle.trim()) {
			startTransition(async () => {
				try {
					await handleCreateSubTask({ taskId, body: { title: taskTitle.trim() } })
					setTaskTitle('')
					setShowForm(false)
				} catch (error) {
					console.error('Failed to create sub task:', error)
				}
			})
		}
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
			optimisticSubTasks,
			showForm,
			taskTitle,
			isPending
		},
		actions: {
			setTaskTitle,
			setShowForm
		},
		handlers: {
			handleDragEnd,
			handleCreateTask,
			handleCancel,
			handleShowForm,
			handleEnterPress
		}
	}
}
