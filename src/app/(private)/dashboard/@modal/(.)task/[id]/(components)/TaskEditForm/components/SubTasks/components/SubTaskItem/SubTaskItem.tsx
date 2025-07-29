import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'

import type { DBSubTask } from '@/types/db.types'

interface Props {
	item: DBSubTask
	handleCheck: (id: string, completed: boolean) => void
}

export function SubTaskItem({ item, handleCheck }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: item.id!
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.7 : 1
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				className={`mb-2 flex cursor-pointer items-center gap-4 rounded-lg p-1 px-5 text-sm font-medium transition-colors duration-20 hover:bg-neutral-100 hover:dark:bg-neutral-800 ${isDragging ? 'z-10 shadow-lg' : ''} `}
			>
				<Checkbox
					checked={item.completed}
					onCheckedChange={() => handleCheck(item.id!, !item.completed)}
					aria-label='Toggle sub task completion'
				/>
				<div
					{...listeners}
					className='flex w-full items-center justify-between'
				>
					<div className='flex-1'>
						<h4 className='text-sm font-medium'>{item.title}</h4>
						{item.description && <p className='mt-1 text-xs text-gray-400'>{item.description}</p>}
					</div>
				</div>
			</div>
		</>
	)
}
