import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type z from 'zod'

import { usePostCreateTaskMutation } from '@/utils/api'
import { getIcon } from '@/utils/constants/icons'

import { createTaskFormSchema } from '../constants/createTaskFormSchema'

export const useCreateTaskForm = (onClose: () => void) => {
	type FormValues = z.infer<typeof createTaskFormSchema>
	const createTask = usePostCreateTaskMutation().mutate

	const form = useForm<FormValues>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			title: '',
			iconName: '',
			dueDate: new Date(),
			startTime: '',
			endTime: ''
		}
	})

	const onSubmit = (data: FormValues) => {
		const iconData = getIcon(data.iconName)
		if (!iconData) return

		createTask({
			due_date: data.dueDate.toISOString(),
			icon_name: iconData.name,
			status: 'not-started',
			title: data.title,
			start_time: data.startTime,
			end_time: data.endTime
		})
		form.reset()
		onClose()
	}
	return {
		form,
		functions: { onSubmit }
	}
}
