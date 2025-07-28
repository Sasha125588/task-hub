'use client'

// import { useClickOutside } from '@siberiacancode/reactuse'
import { Check, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { usePostCreateSubTaskMutation } from '@/utils/api/hooks/task/usePostCreateSubTaskMutation'
import { useI18n } from '@/utils/providers'

export function CreateSubTaskForm({ taskId }: { taskId: string }) {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const i18n = useI18n()

	const createSubTaskMutation = usePostCreateSubTaskMutation()

	// TODO: fix click outside
	// const ref = useClickOutside<HTMLDivElement>(() => setShowForm(false))

	const handleCreateTask = async () => {
		if (!taskTitle.trim() || isLoading) return

		setIsLoading(true)
		try {
			createSubTaskMutation.mutate({
				taskId,
				body: {
					title: taskTitle.trim()
				}
			})

			setTaskTitle('')
			setShowForm(false)
			toast.success('Sub task created!')
		} catch (error) {
			console.error('Failed to create sub task:', error)
			toast.error('Failed to create sub task')
		} finally {
			setIsLoading(false)
		}
	}

	const handleCancel = () => {
		setTaskTitle('')
		setShowForm(false)
	}

	return (
		<div className='w-full'>
			{showForm ? (
				<div className='flex items-center gap-2'>
					<Input
						value={taskTitle}
						onChange={e => setTaskTitle(e.target.value)}
						placeholder='Task name...'
						autoFocus
						disabled={isLoading}
						className='flex-1'
					/>
					<Button
						onClick={handleCreateTask}
						disabled={!taskTitle.trim() || isLoading}
						className='size-8'
					>
						<Check size={16} />
					</Button>
					<Button
						variant='ghost'
						onClick={handleCancel}
						size='icon'
						disabled={isLoading}
						className='hover:bg-accent/50 size-8'
					>
						<X size={16} />
					</Button>
				</div>
			) : (
				<Button
					variant='outline'
					className='h-10 w-full'
					onClick={() => setShowForm(true)}
				>
					<Plus
						size={16}
						className='mr-2'
					/>
					{i18n.formatMessage({ id: 'button.addSubTask' })}
				</Button>
			)}
		</div>
	)
}
