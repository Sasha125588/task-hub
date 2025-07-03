"use client"

import { useRouter } from "next/navigation"

export function TaskModal({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="flex flex-col rounded bg-blue-500 p-6 text-white shadow-lg">
				{children}
				<button
					className="mt-4 rounded bg-white/20 px-4 py-2 hover:bg-white/30"
					onClick={() => router.back()}
				>
					Close modal
				</button>
			</div>
		</div>
	)
}
