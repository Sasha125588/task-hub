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

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

import type { DBSubTask } from '@/types/db.types'

import { useI18n } from '@/utils/providers'

import { SubTask } from './components/SubTask/SubTask'
import { useSubTasksList } from './hooks/useSubTasksList'

export function SubTasksList({ id, subTasks }: { id: string; subTasks: DBSubTask[] }) {
	const i18n = useI18n()
	const { state, functions } = useSubTasksList(id, subTasks)

	const ref = useClickOutside<HTMLDivElement>(() => functions.setShowForm(false))

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return (
		<Card className='h-full'>
			<CardContent className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>
					<I18nText path='subTasksList.title' />
				</h2>

				{!state.showForm ? (
					<Button
						variant='ghost'
						className='border-primary/30 h-14 w-full justify-start border-2 border-dashed'
						onClick={functions.handleShowForm}
						disabled={state.isPending}
					>
						<Plus size={16} />
						<I18nText path='button.addSubTask' />
					</Button>
				) : (
					<div
						ref={ref}
						className='border-primary/30 flex h-14 items-center gap-2 rounded-lg border-2 border-dashed px-3'
					>
						<Input
							value={state.taskTitle}
							onChange={e => functions.setTaskTitle(e.target.value)}
							onKeyDown={event => functions.handleEnterPress(event)}
							placeholder={i18n.formatMessage({ id: 'create-sub-task.title' })}
							autoFocus
							disabled={state.isPending}
							className='flex-1 border-none !bg-transparent shadow-none focus-visible:ring-0'
						/>
						<Button
							onClick={functions.handleCreateTask}
							disabled={!state.taskTitle.trim() || state.isPending}
							className='size-7'
						>
							{state.isPending ? <LoadingSpinner /> : <Check />}
						</Button>
						<Button
							variant='ghost'
							onClick={functions.handleCancel}
							disabled={state.isPending}
							className='size-7'
						>
							<X />
						</Button>
					</div>
				)}

				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={functions.handleDragEnd}
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
									onDelete={() => functions.handleDeleteSubTask(subTask.id)}
									handleUpdate={functions.handleUpdateSubTask}
								/>
							))}
						</SortableContext>
					</div>
				</DndContext>
			</CardContent>
		</Card>
	)
}
