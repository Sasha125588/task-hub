"use client"

import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"

export function TaskModal({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	const onDismiss = () => {
		router.back()
	}

	return createPortal(
		<div className="animate-in fade-in-0 fixed inset-0 z-50 flex h-full items-center justify-center bg-black/50 duration-200">
			<div className="animate-in zoom-in-95 mx-4 flex w-full max-w-sm flex-col rounded-lg bg-blue-500 p-6 text-white shadow-lg duration-200">
				{children}
				<button
					className="mt-4 rounded-lg bg-white/20 px-4 py-2 hover:bg-white/30"
					onClick={onDismiss}
				>
					Close modal
				</button>
			</div>
		</div>,
		document.getElementById("modal-root")!
	)
}
