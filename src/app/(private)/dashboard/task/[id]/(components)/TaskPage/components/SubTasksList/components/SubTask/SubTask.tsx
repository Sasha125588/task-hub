'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { CalendarDays, GripVertical, MoreVertical } from 'lucide-react'

import { TrashIcon } from '@/components/animate-ui/icons/trash-icon'
import { Checkbox } from '@/components/ui/checkbox'

import type { DBSubTask } from '@/types/db.types'

import { cn } from '@/utils/helpers/cn'

export function SubTask({
	subTask,
	onDelete,
	handleUpdate
}: {
	subTask: DBSubTask
	onDelete: () => void
	handleUpdate: (subTaskId: string, completed: boolean) => void
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: subTask.id
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: isDragging ? 'none' : transition,
		opacity: isDragging ? 0.5 : 1
	}

	const handleToggle = async () => {
		try {
			handleUpdate(subTask.id, !subTask.completed)
		} catch (error) {
			console.error('Failed to update sub task:', error)
		}
	}

	const handleDelete = () => {
		try {
			onDelete()
		} catch (error) {
			console.error('Failed to delete sub task:', error)
		}
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				'hover:bg-primary/10 group flex h-17 items-center gap-4 rounded-lg border p-4 transition-colors duration-300',
				subTask.completed && 'bg-primary/10'
			)}
			{...attributes}
		>
			<div className='flex min-w-0 flex-[0.6] items-center gap-3'>
				<GripVertical
					size={16}
					aria-label='Drag and drop'
					className='flex-shrink-0 cursor-grab opacity-50 transition-opacity group-hover:opacity-100'
					{...listeners}
				/>
				<Checkbox
					aria-label='Toggle sub task'
					checked={subTask.completed}
					onCheckedChange={handleToggle}
				/>
				<span
					className={cn(
						'text-sm font-medium',
						subTask.completed && 'text-muted-foreground line-through'
					)}
				>
					{subTask.title}
				</span>
			</div>

			<div className='border-border/50 flex flex-[0.4] items-center justify-between border-l pl-4'>
				<div className='flex items-center gap-3'>
					<div className='text-muted-foreground flex items-center gap-1.5'>
						<CalendarDays
							aria-label='Created at'
							size={14}
							className='opacity-70'
						/>
						<span className='text-xs'>
							{format(subTask.created_at ?? new Date(), 'MMM dd, yyyy')}
						</span>
					</div>

					<div className='flex gap-1'>
						{/* TODO: implement tags */}
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
				<div className='flex items-center gap-3'>
					<MoreVertical
						aria-label='More options'
						size={16}
						className='text-muted-foreground cursor-pointer opacity-50 transition-opacity hover:opacity-100'
					/>
					<TrashIcon
						aria-label='Delete sub task'
						onClick={handleDelete}
						className='text-destructive cursor-pointer opacity-50 transition-opacity hover:opacity-100'
						animateOnHover
						size={16}
					/>
				</div>
			</div>
		</div>
	)
}
