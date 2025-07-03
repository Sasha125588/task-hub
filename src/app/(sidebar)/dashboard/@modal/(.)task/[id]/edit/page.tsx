import { EditForm } from "./EditForm"

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskModal({ params }: Props) {
	const { id } = await params

	return <EditForm id={id} />
}
