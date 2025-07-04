import { TaskEditForm } from "@/components/forms/TaskForm"
import { TaskModal } from "@/components/modals/TaskModal"

interface Props {
	id: string
}

export function TastEdit({ id }: Props) {
	return (
		<TaskModal>
			<TaskEditForm id={id} />
		</TaskModal>
	)
}
