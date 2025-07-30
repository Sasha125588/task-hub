import { TaskPage } from './(components)/TaskPage/TaskPage'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditPage({ params }: Props) {
	const { id } = await params

	return <TaskPage taskId={id} />
}
