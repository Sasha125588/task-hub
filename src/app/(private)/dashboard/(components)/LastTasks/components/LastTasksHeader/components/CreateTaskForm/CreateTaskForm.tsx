import { DatePicker } from '@/components/common/DatePicker'
import { I18nText } from '@/components/common/I18nText/I18nText'
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

import { useI18n } from '@/utils/providers'

import { useCreateTaskForm } from './hooks/useCreateTaskForm'

interface CreateTaskFormProps {
	isOpen: boolean
	onClose: () => void
}

export function CreateTaskForm({ isOpen, onClose }: CreateTaskFormProps) {
	const i18n = useI18n()

	const { functions, form } = useCreateTaskForm(onClose)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<I18nText path='create-task.title' />
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(functions.onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<I18nText path='create-task.form.title' />
									</FormLabel>
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
									<FormLabel>
										<I18nText path='create-task.form.icon' />
									</FormLabel>
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
									<FormLabel>
										<I18nText path='create-task.form.dueDate' />
									</FormLabel>
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
											<I18nText path='create-task.form.startTime' />
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
										<FormLabel>
											<I18nText path='create-task.form.endTime' />
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
						</div>
						<div className='flex justify-end gap-2'>
							<Button
								type='button'
								variant='outline'
								onClick={onClose}
							>
								<I18nText path='button.cancel' />
							</Button>
							<Button type='submit'>
								<I18nText path='button.create' />
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
