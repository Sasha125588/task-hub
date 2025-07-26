'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetTaskByIdQuery, usePutUpdateTaskMutation } from '@/utils/api'
import { useGetSubTasksQuery } from '@/utils/api/hooks/task/useGetSubTasksQuery'
import { useI18n } from '@/utils/providers'

import { taskEditFormSchema } from '../constants/taskEditFormSchema'

type TaskFormValues = z.infer<typeof taskEditFormSchema>

export const useTaskEditForm = (id: string) => {
	const i18n = useI18n()
	const router = useRouter()
	const { data: task, isLoading } = useGetTaskByIdQuery(id)
	const { data: subTasks } = useGetSubTasksQuery(id)

	const updateTask = usePutUpdateTaskMutation().mutateAsync

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskEditFormSchema),
		defaultValues: {
			title: '',
			dueDate: new Date(),
			iconName: '',
			subTasks: []
		}
	})

	const onSubmit = form.handleSubmit(async (values: TaskFormValues) => {
		await updateTask({
			id,
			params: {
				title: values.title,
				due_date: values.dueDate.toISOString(),
				icon_name: values.iconName
			}
		})
		toast.success(i18n.formatMessage({ id: 'toast.taskUpdated' }), {
			description: `${format(new Date(), 'Pp')}`
		})
		router.back()
	})

	const updateTitle = async (title: string) => {
		await updateTask({
			id,
			params: { title }
		})
		toast.success(i18n.formatMessage({ id: 'toast.taskUpdated' }))
	}

	const closeModal = () => {
		router.back()
	}

	useEffect(() => {
		if (task) {
			form.reset({
				title: task.title,
				dueDate: new Date(task.due_date),
				iconName: task.icon_name,
				subTasks: subTasks ?? []
			})
		}
	}, [task, subTasks, form])

	return {
		state: {
			task,
			subTasks,
			isLoading
		},
		form,
		functions: {
			onSubmit,
			updateTitle,
			closeModal
		}
	}
}
