import { TastEdit } from "./EditForm"

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditModal({ params }: Props) {
	const { id } = await params

	return <TastEdit id={id} />
}
