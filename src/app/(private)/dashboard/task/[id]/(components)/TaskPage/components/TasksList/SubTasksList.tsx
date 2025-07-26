'use client'

import {
	DndContext,
	type DragEndEvent,
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
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useGetSubTasksQuery } from '@/utils/api/hooks/task/useGetSubTasksQuery'
import { usePostCreateSubTaskMutation } from '@/utils/api/hooks/task/usePostCreateSubTaskMutation'
import { usePostReorderSubTasksMutation } from '@/utils/api/hooks/task/usePostReorderSubTasksMutation'

import { SubTask } from './components/SubTask'

export function SubTasksList({ id }: { id: string }) {
	const [showForm, setShowForm] = useState(false)
	const [taskTitle, setTaskTitle] = useState('')

	const { data: subTasks } = useGetSubTasksQuery(id)

	const createSubTask = usePostCreateSubTaskMutation().mutate
	const reorderSubTasks = usePostReorderSubTasksMutation().mutate

	const ref = useClickOutside<HTMLDivElement>(() => setShowForm(false))

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (!active || !over || !subTasks) return
		if (active.id === over.id) return

		const oldIndex = subTasks.findIndex(t => t.id === active.id)
		const newIndex = subTasks.findIndex(t => t.id === over.id)

		if (oldIndex !== -1 && newIndex !== -1) {
			reorderSubTasks({
				subTasks,
				sourceIndex: oldIndex,
				destinationIndex: newIndex
			})
		}
	}

	const handleCreateTask = () => {
		if (taskTitle.trim()) {
			createSubTask({ taskId: id, body: { title: taskTitle.trim(), completed: false } })
			setTaskTitle('')
			setShowForm(false)
		}
	}

	const handleCancel = () => {
		setTaskTitle('')
		setShowForm(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleCreateTask()
		} else if (e.key === 'Escape') {
			handleCancel()
		}
	}

	return (
		<Card className='h-full'>
			<CardContent className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Sub Tasks List</h2>

				{!showForm ? (
					<Button
						variant='ghost'
						className='border-primary/30 h-14 w-full justify-start border-2 border-dashed'
						onClick={() => setShowForm(true)}
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
							placeholder='Enter task title...'
							onKeyDown={handleKeyDown}
							autoFocus
							className='flex-1 border-none !bg-transparent shadow-none focus-visible:ring-0'
						/>
						<Button
							onClick={handleCreateTask}
							disabled={!taskTitle.trim()}
							className='size-7'
						>
							<Check />
						</Button>
						<Button
							variant='ghost'
							onClick={handleCancel}
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
								/>
							))}
						</SortableContext>
					</div>
				</DndContext>
			</CardContent>
		</Card>
	)
}
