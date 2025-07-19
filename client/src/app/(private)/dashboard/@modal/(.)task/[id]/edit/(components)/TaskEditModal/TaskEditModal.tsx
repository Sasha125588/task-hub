'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

import { useI18n } from '@/utils/providers'

interface Props {
	id: string
}

export function TaskEditModal({ id, children }: PropsWithChildren<Props>) {
	const i18n = useI18n()
	const router = useRouter()

	const closeModal = () => router.back()

	return createPortal(
		<Dialog
			open={Boolean(id)}
			onOpenChange={closeModal}
		>
			<DialogContent className='top-1/3 max-w-[80%] overflow-hidden'>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold'>
						{i18n.formatMessage({ id: 'task-edit.title' })}
					</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>,
		document.getElementById('modal-root')!
	)
}
