import { TaskModal } from "@/components/modals/TaskModal"

interface Props {
	id: string
}

export function TastEditForm({ id }: Props) {
	return (
		<TaskModal>
			<div>Task Page. Task id: {id}</div>
		</TaskModal>
	)
}
