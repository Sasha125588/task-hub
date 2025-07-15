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

import { SubTasks } from './components/SubTasks/SubTasks'
import { useTaskEditForm } from './hooks/useTaskEditForm'

interface Props {
	id: string
}

export function TaskEditForm({ id }: Props) {
	const { state, form, functions } = useTaskEditForm(id)

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
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										disabled={state.loading}
										placeholder='Task title'
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
								<FormLabel>Due Date</FormLabel>
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
								<FormLabel>Select Icon</FormLabel>
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
						disabled={state.loading}
					>
						Submit
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
									<SubTasks id={id} />
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
