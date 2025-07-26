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

import type { DBSubTask } from '@/types/db.types'

import { usePostReorderSubTasksMutation } from '@/utils/api/hooks/task/usePostReorderSubTasksMutation'
import { usePutUpdateSubTaskMutation } from '@/utils/api/hooks/task/usePutUpdateSubTaskMutation'

import { SubTaskItem } from './components/SubTaskItem/SubTaskItem'
import { CreateSubTaskForm } from '@/app/(private)/dashboard/@modal/(.)task/[id]/(components)/TaskEditForm/components/SubTasks/components/CreateSubTaskForm/CreateSubTaskForm'

interface Props {
	id: string
	subTasks: DBSubTask[]
}

export function SubTasks({ id, subTasks }: Props) {
	const reorderSubTasks = usePostReorderSubTasksMutation().mutate

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const updateSubTask = usePutUpdateSubTaskMutation().mutate

	const handleCheck = (id: string, completed: boolean) => {
		updateSubTask({
			id,
			params: { completed }
		})
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (active.id !== over?.id) {
			const oldIndex = subTasks.findIndex(t => t.id === active.id)
			const newIndex = subTasks.findIndex(t => t.id === over?.id)

			if (oldIndex !== -1 && newIndex !== -1) {
				reorderSubTasks({
					subTasks,
					sourceIndex: oldIndex,
					destinationIndex: newIndex
				})
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
								handleCheck={handleCheck}
							/>
						</div>
					)
				})}
			</SortableContext>
		</DndContext>
	)
}
