'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useUnit } from 'effector-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { taskEditFormSchema } from '../constants/taskEditFormSchema'

import { $getTaskByID, taskUpdated as updateTask } from '@/stores/task/store'

type TaskFormValues = z.infer<typeof taskEditFormSchema>

export const useTaskEditForm = (id: string) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const task = useUnit($getTaskByID)(id)

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskEditFormSchema),
		defaultValues: task
	})

	const onSubmit = form.handleSubmit((values: TaskFormValues) => {
		setLoading(true)
		updateTask({ id, ...values })
		toast.success('Task updated successfully', {
			description: `${format(new Date(), 'Pp')}`
		})
		setLoading(false)
		router.back()
	})

	return {
		state: {
			loading
		},
		form,
		functions: { onSubmit }
	}
}
