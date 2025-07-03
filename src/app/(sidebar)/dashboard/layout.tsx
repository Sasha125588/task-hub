import type { ReactNode } from "react"

interface Props {
	children: ReactNode
	modal: ReactNode
}
export default function ModalLayout({ children, modal }: Props) {
	return (
		<div>
			{modal}
			{children}
		</div>
	)
}
