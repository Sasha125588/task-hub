import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DatePicker } from '@/components/common/DatePicker'
import { IconPicker } from '@/components/common/IconPicker'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { usePostCreateTaskMutation } from '@/utils/api'
import { getIcon } from '@/utils/constants/icons'
import { useI18n } from '@/utils/providers'

const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	iconName: z.string().min(1, { message: 'Icon is required' }),
	dueDate: z.date(),
	startTime: z.string().optional(),
	endTime: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

interface CreateTaskFormProps {
	isOpen: boolean
	onClose: () => void
}

export function CreateTaskForm({ isOpen, onClose }: CreateTaskFormProps) {
	const i18n = useI18n()
	const createTask = usePostCreateTaskMutation().mutate

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
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
			start_time: data.startTime || undefined,
			end_time: data.endTime || undefined
		})
		form.reset()
		onClose()
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{i18n.formatMessage({ id: 'create-task.title' })}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{i18n.formatMessage({ id: 'create-task.form.title' })}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='iconName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{i18n.formatMessage({ id: 'create-task.form.icon' })}</FormLabel>
									<FormControl>
										<IconPicker
											placeholder={i18n.formatMessage({ id: 'create-task.form.icon' })}
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='dueDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{i18n.formatMessage({ id: 'create-task.form.dueDate' })}</FormLabel>
									<FormControl>
										<DatePicker
											dateForm={field.value}
											onChangeForm={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='startTime'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{i18n.formatMessage({ id: 'create-task.form.startTime' })}
										</FormLabel>
										<FormControl>
											<Input
												type='time'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='endTime'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{i18n.formatMessage({ id: 'create-task.form.endTime' })}</FormLabel>
										<FormControl>
											<Input
												type='time'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end gap-2'>
							<Button
								type='button'
								variant='outline'
								onClick={onClose}
							>
								{i18n.formatMessage({ id: 'button.cancel' })}
							</Button>
							<Button type='submit'>{i18n.formatMessage({ id: 'button.create' })}</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
