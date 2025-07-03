import { Suspense } from "react"

import { TastEditForm } from "./EditForm"

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditModal({ params }: Props) {
	const { id } = await params

	return (
		<Suspense fallback="Loading edit form...">
			<TastEditForm id={id} />
		</Suspense>
	)
}
