import Link from "next/link"
import { Suspense } from "react"

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditPage({ params }: Props) {
	const { id } = await params

	return (
		<Suspense fallback="Loading task edit page...">
			<Link href="/dashboard">Task Page. Task id: {id}</Link>
		</Suspense>
	)
}
