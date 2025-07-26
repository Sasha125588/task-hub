import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { CalendarDays, GripVertical, MoreVertical, Trash } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

import type { DBSubTask } from '@/types/db.types'

import { useDeleteSubTaskMutation } from '@/utils/api/hooks/task/useDeleteSubTaskMutation'
import { usePutUpdateSubTaskMutation } from '@/utils/api/hooks/task/usePutUpdateSubTaskMutation'
import { cn } from '@/utils/helpers/cn'

export function SubTask({ subTask }: { subTask: DBSubTask }) {
	const deleteSubTask = useDeleteSubTaskMutation().mutate
	const updateSubTask = usePutUpdateSubTaskMutation().mutate
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: subTask.id
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: isDragging ? 'none' : transition,
		opacity: isDragging ? 0.5 : 1
	}

	const handleToggle = () => {
		updateSubTask({ id: subTask.id, params: { completed: !subTask.completed } })
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				'hover:bg-primary/10 flex items-center justify-between rounded-lg border p-4 transition-colors duration-300',
				subTask.completed && 'bg-primary/10'
			)}
			{...attributes}
		>
			<div className='flex items-center gap-3'>
				<GripVertical
					size={16}
					className='cursor-grab'
					{...listeners}
				/>
				<Checkbox
					checked={subTask.completed}
					onCheckedChange={() => handleToggle()}
				/>
				<span className='text-sm font-semibold'>{subTask.title}</span>
			</div>

			<div className='border-l-muted-foreground/30 flex w-1/2 items-center justify-between border-l-[1px] pl-3'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center gap-1'>
						<CalendarDays size={16} />
						<span className='text-xs text-gray-500'>
							{format(subTask.created_at ?? new Date(), 'MMM dd,yyyy')}
						</span>
					</div>

					<div className='flex gap-1'>
						{/* {subTask.tags?.map(tag => (
							<span
								key={tag.id}
								className='rounded px-2 py-1 text-xs font-medium'
								style={{
									backgroundColor: `${tag.color}15`,
									color: tag.color
								}}
							>
								{tag.name}
							</span>
						))} */}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<MoreVertical
						size={16}
						className='cursor-pointer'
					/>
					<Trash
						size={16}
						className='cursor-pointer'
						onClick={() => deleteSubTask(subTask.id)}
					/>
				</div>
			</div>
		</div>
	)
}
