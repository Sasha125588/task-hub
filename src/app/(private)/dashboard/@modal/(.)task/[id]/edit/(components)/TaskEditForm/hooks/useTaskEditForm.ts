'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetTaskByIdQuery, usePutUpdateTaskMutation } from '@/utils/api'
import { useI18n } from '@/utils/providers'

import { taskEditFormSchema } from '../constants/taskEditFormSchema'

type TaskFormValues = z.infer<typeof taskEditFormSchema>

export const useTaskEditForm = (id: string) => {
	const i18n = useI18n()
	const router = useRouter()
	const { data, isLoading } = useGetTaskByIdQuery(id)
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

	useEffect(() => {
		if (data) {
			form.reset({
				title: data.title,
				dueDate: new Date(data.due_date),
				iconName: data.icon_name,
				subTasks: data.sub_tasks
			})
		}
	}, [data, form])

	return {
		state: {
			data,
			isLoading
		},
		form,
		functions: { onSubmit }
	}
}
