import Link from 'next/link'

import { TaskPage } from '@/app/(private)/dashboard/task/[id]/(components)/TaskPage/TaskPage'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditPage({ params }: Props) {
	const { id } = await params

	return (
		<>
			<Link href='/dashboard'>Task Page. Task id: {id}</Link>
			<TaskPage id={id} />
		</>
	)
}
