import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { usePostCreateSubTaskMutation } from '@/utils/api'

export const useCreateSubTaskForm = (taskId: string) => {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')
	const [isPending, startTransition] = useTransition()

	const createSubTaskMutation = usePostCreateSubTaskMutation()

	const handleCreateTask = async () => {
		if (!taskTitle.trim() || isPending) return
		try {
			startTransition(() => {
				createSubTaskMutation.mutate({
					taskId,
					body: {
						title: taskTitle.trim()
					}
				})

				setTaskTitle('')
				setShowForm(false)
				toast.success('Sub task created!')
			})
		} catch (error) {
			console.error('Failed to create sub task:', error)
			toast.error('Failed to create sub task')
		}
	}

	const handleCancel = () => {
		setTaskTitle('')
		setShowForm(false)
	}

	return {
		state: {
			showForm,
			taskTitle,
			isPending
		},
		functions: {
			handleCreateTask,
			handleCancel,
			setTaskTitle,
			setShowForm
		}
	}
}
