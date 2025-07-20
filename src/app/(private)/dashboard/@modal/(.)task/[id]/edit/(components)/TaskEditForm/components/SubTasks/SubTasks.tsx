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
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useUnit } from 'effector-react'

import type { ModelsSubTask, ModelsTask } from '../../../../../../../../../../../../generated/api'

import { SubTaskItem } from './components/SubTaskItem/SubTaskItem'
import { CreateSubTaskForm } from '@/app/(private)/dashboard/@modal/(.)task/[id]/edit/(components)/TaskEditForm/components/SubTasks/components/CreateSubTaskForm/CreateSubTaskForm'
import { subTasksReorderer } from '@/stores/task/status-type'

interface Props {
	id: string
	task: ModelsTask
}

export function SubTasks({ id, task }: Props) {
	const reorderSubTasks = useUnit(subTasksReorderer)

	const subTasks = task?.sub_tasks || []

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (active.id !== over?.id) {
			const oldIndex = subTasks.findIndex(t => t.id === active.id)
			const newIndex = subTasks.findIndex(t => t.id === over?.id)

			if (oldIndex !== -1 && newIndex !== -1) {
				const reordererSubTasks: ModelsSubTask[] = arrayMove(subTasks, oldIndex, newIndex)
				reorderSubTasks({ taskId: id, subTasks: reordererSubTasks })
			}
		}
	}
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<CreateSubTaskForm taskId={id} />
			<SortableContext
				items={subTasks.map(item => item.id!)}
				strategy={verticalListSortingStrategy}
			>
				{subTasks.map(item => {
					return (
						<div key={item.id}>
							<SubTaskItem
								item={item}
								key={item.id}
							/>
						</div>
					)
				})}
			</SortableContext>
		</DndContext>
	)
}
