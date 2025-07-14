import { TaskEditForm } from './(components)/TaskEditForm'
import { TaskEditModal } from './(components)/TaskEditModal'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEdit({ params }: Props) {
	const { id } = await params

	return (
		<TaskEditModal id={id}>
			<TaskEditForm id={id} />
		</TaskEditModal>
	)
}
