'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

import { DatePicker } from '@/components/common/DatePicker'
import { I18nText } from '@/components/common/I18nText/I18nText'
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
					<p className='text-muted-foreground'>
						<I18nText path='loading.task' />
					</p>
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
					<div className='flex items-center justify-between'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>
										<I18nText path='field.title.label' />
									</FormLabel>
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
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='mt-6 ml-4'
						>
							<Button
								variant='outline'
								size='icon'
								className='bg-primary/5 hover:bg-primary/10 border-primary/20 cursor-pointer'
								onClick={() => window.location.reload()}
							>
								<ArrowUpRight className='text-primary h-4 w-4' />
							</Button>
						</motion.div>
					</div>
					<FormField
						control={form.control}
						name='dueDate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<I18nText path='field.dueDate.label' />
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
					<FormField
						control={form.control}
						name='iconName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<I18nText path='field.icon.label' />
								</FormLabel>
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
						<I18nText path='button.submit' />
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
