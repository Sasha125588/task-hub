import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from "@dnd-kit/core"
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { useUnit } from "effector-react"

import { MultiStepForm } from "@/components/ui/multi-step-form"

import { SubTaskItem } from "./SubTaskItem"
import { $getTaskByID, subTasksReorderer } from "@/stores/task/store"
import type { subTask } from "@/types/task.types"

interface Props {
	id: string
}

export function SubTaskList({ id }: Props) {
	const getTaskByID = useUnit($getTaskByID)
	const reorderSubTasks = useUnit(subTasksReorderer)
	const task = getTaskByID(id)!

	const subTasks = task.subTasks || []

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
				const reordererSubTasks: subTask[] = arrayMove(
					subTasks,
					oldIndex,
					newIndex
				)
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
			<MultiStepForm taskId={id} />
			<SortableContext
				items={subTasks.map(item => item.id)}
				strategy={verticalListSortingStrategy}
			>
				{subTasks?.map(item => {
					return (
						<div key={item.id}>
							<SubTaskItem item={item} key={item.id} />
						</div>
					)
				})}
			</SortableContext>
		</DndContext>
	)
}
