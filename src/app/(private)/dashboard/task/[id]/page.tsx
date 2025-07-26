import { TaskPage } from '@/app/(private)/dashboard/task/[id]/TaskPage'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditPage({ params }: Props) {
	const { id } = await params

	return <TaskPage taskId={id} />
}
