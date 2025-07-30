'use client'

// import { useClickOutside } from '@siberiacancode/reactuse'
import { Check, Plus, X } from 'lucide-react'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCreateSubTaskForm } from '@/app/(private)/dashboard/@modal/(.)task/[id]/(components)/TaskEditForm/components/SubTasks/components/CreateSubTaskForm/hooks/useCreateSubTaskForm'

export function CreateSubTaskForm({ taskId }: { taskId: string }) {
	const { state, functions } = useCreateSubTaskForm(taskId)

	// TODO: fix click outside
	// const ref = useClickOutside<HTMLDivElement>(() => setShowForm(false))

	return (
		<div className='w-full'>
			{state.showForm ? (
				<div className='flex items-center gap-2'>
					<Input
						value={state.taskTitle}
						onChange={e => functions.setTaskTitle(e.target.value)}
						placeholder='Sub task name...'
						autoFocus
						disabled={state.isPending}
						className='flex-1'
					/>
					<Button
						onClick={functions.handleCreateTask}
						disabled={!state.taskTitle.trim() || state.isPending}
						className='size-8'
					>
						<Check size={16} />
					</Button>
					<Button
						variant='ghost'
						onClick={functions.handleCancel}
						size='icon'
						disabled={state.isPending}
						className='hover:bg-accent/50 size-8'
					>
						<X size={16} />
					</Button>
				</div>
			) : (
				<Button
					variant='outline'
					className='h-10 w-full'
					onClick={() => functions.setShowForm(true)}
				>
					<Plus
						size={16}
						className='mr-2'
					/>
					<I18nText path='button.addSubTask' />
				</Button>
			)}
		</div>
	)
}
