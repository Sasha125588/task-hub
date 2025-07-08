import { useUnit } from "effector-react"

import { MultiStepForm } from "@/components/ui/multi-step-form"

import { $getTaskByID } from "@/stores/task/store"

interface Props {
	id: string
}

export function SubTaskList({ id }: Props) {
	const getTaskByID = useUnit($getTaskByID)

	const task = getTaskByID(id)!
	return (
		<div>
			<MultiStepForm taskId={id} />
			<div>
				{task.subTasks?.map(item => {
					return <div key={item.id}>{item.title}</div>
				})}
			</div>
		</div>
	)
}
