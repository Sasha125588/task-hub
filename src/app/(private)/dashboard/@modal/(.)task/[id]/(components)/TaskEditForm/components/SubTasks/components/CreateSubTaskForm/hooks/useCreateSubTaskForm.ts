import { useState } from 'react'
import { toast } from 'sonner'

import { usePostCreateSubTaskMutation } from '@/utils/api'

export const useCreateSubTaskForm = (taskId: string) => {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const createSubTaskMutation = usePostCreateSubTaskMutation()

	const handleCreateTask = async () => {
		if (!taskTitle.trim() || isLoading) return

		setIsLoading(true)
		try {
			createSubTaskMutation.mutate({
				taskId,
				body: {
					title: taskTitle.trim()
				}
			})

			setTaskTitle('')
			setShowForm(false)
			toast.success('Sub task created!')
		} catch (error) {
			console.error('Failed to create sub task:', error)
			toast.error('Failed to create sub task')
		} finally {
			setIsLoading(false)
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
			isLoading
		},
		functions: {
			handleCreateTask,
			handleCancel,
			setTaskTitle,
			setShowForm
		}
	}
}
