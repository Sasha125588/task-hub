'use client'

import { DatePicker } from '@/components/common/DatePicker'
import { IconPicker } from '@/components/common/IconPicker'
import { Button } from '@/components/ui/button'
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

import { SubTasks } from './components/SubTasks/SubTasks'
import { useTaskEditForm } from './hooks/useTaskEditForm'

interface Props {
	id: string
}

export function TaskEditForm({ id }: Props) {
	const i18n = useI18n()

	const { state, form, functions } = useTaskEditForm(id)

	if (state.isLoading) {
		return (
			<div className='flex items-center justify-center p-8'>
				<div className='text-center'>
					<div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
					<p className='text-muted-foreground'>{i18n.formatMessage({ id: 'loading.task' })}</p>
				</div>
			</div>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={functions.onSubmit}
				className='grid grid-cols-2 gap-8'
			>
				<div className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n.formatMessage({ id: 'field.title.label' })}</FormLabel>
								<FormControl>
									<Input
										disabled={state.isLoading}
										placeholder={i18n.formatMessage({
											id: 'field.title.placeholder'
										})}
										aria-label='Task title'
										{...field}
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
								<FormLabel>{i18n.formatMessage({ id: 'field.dueDate.label' })}</FormLabel>
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
					<FormField
						control={form.control}
						name='iconName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n.formatMessage({ id: 'field.icon.label' })}</FormLabel>
								<FormControl>
									<IconPicker
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className='cursor-pointer'
						type='submit'
						disabled={state.isLoading}
					>
						{i18n.formatMessage({ id: 'button.submit' })}
					</Button>
				</div>
				<div className='space-y-8'>
					<FormField
						control={form.control}
						name='subTasks'
						render={() => (
							<FormItem>
								<FormLabel className='pb-3.5'></FormLabel>
								<FormControl>
									<SubTasks
										id={id}
										subTasks={state.subTasks ?? []}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
