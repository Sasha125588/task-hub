'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

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
import {
	MultiStepFormWrapper,
	Step,
	useMultiStepForm
} from '@/components/ui/multi-step-form-wrapper'

import { useI18n } from '@/utils/providers'

import { Dialog, DialogContent } from './dialog'

const SubTaskStatuses = ['not-started', 'in-progress', 'completed'] as const

const basicInfoSchema = z.object({
	title: z.string().min(1, { message: 'Name is required' }),
	status: z.enum(SubTaskStatuses)
})

const messageSchema = z.object({
	description: z.string().min(5, { message: 'Description is too short' })
})

const formSchema = z.object({
	...basicInfoSchema.shape,
	...messageSchema.shape
})

type FormValues = z.infer<typeof formSchema>

export function MultiStepForm({ taskId }: { taskId: string }) {
	const [isFormVisible, setIsFormVisible] = useState(false)
	const i18n = useI18n()

	const initialValues: Partial<FormValues> = {
		title: '',
		status: 'not-started',
		description: ''
	}

	const handleComplete = (data: FormValues) => {
		toast.success(i18n.formatMessage({ id: 'toast.subTaskAdded' }))
		setIsFormVisible(false)
		console.log(data)
		// createSubTask({ subTask: { id: crypto.randomUUID(), ...data }, taskId })
	}

	const handleCancel = () => {
		setIsFormVisible(false)
	}

	if (!isFormVisible) {
		return (
			<Button
				onClick={() => setIsFormVisible(true)}
				variant='outline'
				className='w-full'
			>
				{i18n.formatMessage({ id: 'button.addSubTask' })}
			</Button>
		)
	}

	return (
		<Dialog open={Boolean(taskId)}>
			<DialogContent className='z-50'>
				<DialogTitle></DialogTitle>
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold'>
							{i18n.formatMessage({ id: 'button.addSubTask' })}
						</h3>
						<Button
							type='button'
							variant='ghost'
							size='sm'
							onClick={handleCancel}
							className='text-gray-500 hover:text-gray-700'
						>
							×
						</Button>
					</div>
					<MultiStepFormWrapper
						onComplete={handleComplete}
						completeButtonText={i18n.formatMessage({ id: 'button.addTask' })}
						className='rounded border p-4'
						schema={formSchema}
						initialData={initialValues}
					>
						<Step
							title={i18n.formatMessage({ id: 'form.basicInfo' })}
							schema={basicInfoSchema}
						>
							<BasicInfoStep />
						</Step>
						<Step
							title={i18n.formatMessage({ id: 'form.additionalInfo' })}
							schema={messageSchema}
						>
							<MessageStep />
						</Step>
					</MultiStepFormWrapper>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function BasicInfoStep() {
	const { form } = useMultiStepForm<FormValues>()
	const i18n = useI18n()

	return (
		<Form {...form}>
			<div className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{i18n.formatMessage({ id: 'field.title.label' })}</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder={i18n.formatMessage({
										id: 'field.title.placeholder'
									})}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{i18n.formatMessage({ id: 'field.status.label' })}</FormLabel>
							<FormControl>
								<select
									{...field}
									className='w-full rounded border p-2 text-sm dark:bg-gray-800'
								>
									{SubTaskStatuses.map(status => (
										<option
											key={status}
											value={status}
										>
											{i18n.formatMessage({ id: `field.status.${status}` })}
										</option>
									))}
								</select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</Form>
	)
}

function MessageStep() {
	const { form } = useMultiStepForm<FormValues>()
	const i18n = useI18n()

	return (
		<Form {...form}>
			<div className='space-y-3'>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{i18n.formatMessage({ id: 'field.description.label' })}</FormLabel>
							<FormControl>
								<textarea
									{...field}
									placeholder={i18n.formatMessage({
										id: 'field.description.placeholder'
									})}
									className='min-h-[80px] w-full rounded border p-2 text-sm dark:bg-gray-800'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</Form>
	)
}
