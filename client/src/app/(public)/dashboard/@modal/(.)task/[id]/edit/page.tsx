import { TaskEditForm } from './(components)/TaskEditForm'
import { TaskModal } from './(components)/TaskModal'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEdit({ params }: Props) {
	const { id } = await params

	return (
		<TaskModal id={id}>
			<TaskEditForm id={id} />
		</TaskModal>
	)
}
