'use client'

import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useClickOutside } from '@siberiacancode/reactuse'
import { Check, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

import type { DBSubTask } from '@/types/db.types'

import { SubTask } from './components/SubTask/SubTask'
import { useSubTasksList } from '@/app/(private)/dashboard/task/[id]/(components)/SubTasksList/hooks/useSubTasksList'

export function SubTasksList({ id, subTasks }: { id: string; subTasks: DBSubTask[] }) {
	const { state, actions, handlers } = useSubTasksList(id, subTasks)

	const { showForm, taskTitle, isPending } = state
	const { setTaskTitle, setShowForm } = actions
	const {
		handleDragEnd,
		handleCreateTask,
		handleDeleteSubTask,
		handleCancel,
		handleShowForm,
		handleEnterPress,
		handleUpdateSubTask
	} = handlers

	const ref = useClickOutside<HTMLDivElement>(() => setShowForm(false))

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return (
		<Card className='h-full'>
			<CardContent className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Sub Tasks List</h2>

				{!showForm ? (
					<Button
						variant='ghost'
						className='border-primary/30 h-14 w-full justify-start border-2 border-dashed'
						onClick={handleShowForm}
						disabled={isPending}
					>
						<Plus size={16} />
						New Sub Task
					</Button>
				) : (
					<div
						ref={ref}
						className='border-primary/30 flex h-14 items-center gap-2 rounded-lg border-2 border-dashed px-3'
					>
						<Input
							value={taskTitle}
							onChange={e => setTaskTitle(e.target.value)}
							onKeyDown={event => handleEnterPress(event)}
							placeholder='Enter task title...'
							autoFocus
							disabled={isPending}
							className='flex-1 border-none !bg-transparent shadow-none focus-visible:ring-0'
						/>
						<Button
							onClick={handleCreateTask}
							disabled={!taskTitle.trim() || isPending}
							className='size-7'
						>
							{isPending ? <LoadingSpinner /> : <Check />}
						</Button>
						<Button
							variant='ghost'
							onClick={handleCancel}
							disabled={isPending}
							className='size-7'
						>
							<X />
						</Button>
					</div>
				)}

				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<div className='flex flex-col gap-2 pt-3'>
						<SortableContext
							items={subTasks?.map(task => task.id!) ?? []}
							strategy={verticalListSortingStrategy}
						>
							{subTasks?.map(subTask => (
								<SubTask
									key={subTask.id}
									subTask={subTask}
									onDelete={() => handleDeleteSubTask(subTask.id)}
									handleUpdate={handleUpdateSubTask}
								/>
							))}
						</SortableContext>
					</div>
				</DndContext>
			</CardContent>
		</Card>
	)
}
