"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

interface Props {
	children: React.ReactNode
	id: string
}

export function TaskModal({ children, id }: Props) {
	const router = useRouter()

	const CloseModal = () => {
		router.back()
	}

	return createPortal(
		<Dialog open={Boolean(id)} onOpenChange={CloseModal}>
			<DialogContent className="w-sm overflow-hidden">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">Edit Task</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>,
		document.getElementById("modal-root")!
	)
}
