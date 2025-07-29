'use client'

import { Send } from 'lucide-react'
import { motion } from 'motion/react'
import { Suspense, useEffect } from 'react'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

import type { DBChannel } from '@/types/db.types'

import { useChannelDeletion } from '@/utils/hooks/chat/useChannelDeletion'
import { useChatScroll } from '@/utils/hooks/chat/useChatScroll'
import { useI18n } from '@/utils/providers'

import { CreatedBy } from './components/CreatedBy/CreatedBy'
import { MessageList } from './components/MessageList/MessageList'
import { useChatWindow } from '@/app/(private)/message/[channelId]/components/ChatWindow/hooks/useChatWindow'

interface ChatWindowProps {
	channel: DBChannel
}

export function ChatWindow({ channel }: ChatWindowProps) {
	const i18n = useI18n()
	const { state, functions } = useChatWindow(channel)
	const { containerRef, scrollToBottom } = useChatScroll()

	useChannelDeletion(channel.id)

	useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom, state.messages])

	return (
		<div className='flex h-full w-full flex-col'>
			<div className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-2'>
					<span className='text-muted-foreground text-xl'>#</span>
					<h1 className='text-lg font-semibold'>{channel.slug}</h1>
					<motion.div
						className='bg-muted/30 inline-flex items-center rounded-full px-2 py-0.5'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className='mr-2 h-2 w-2 rounded-full bg-emerald-500'
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.7, 1, 0.7]
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'easeInOut'
							}}
						/>
						<span className='text-muted-foreground text-sm'>
							{state.onlineUsers} <I18nText path='chat.onlineUsers' />
						</span>
					</motion.div>
				</div>
				{state.user && <CreatedBy user={state.user} />}
			</div>

			<div
				className='flex-1 overflow-y-auto p-4'
				ref={containerRef}
			>
				<Suspense
					fallback={
						<div className='flex h-full w-full items-center justify-center'>
							<LoadingSpinner />
						</div>
					}
				>
					<MessageList
						messages={state.messages}
						channelSlug={channel.slug!}
					/>
				</Suspense>
			</div>

			<form
				onSubmit={functions.handleSendMessage}
				className='flex w-full max-w-xl gap-2 bg-transparent px-4 pb-4'
			>
				<Input
					className='rounded-full bg-transparent text-sm'
					type='text'
					value={state.newMessage}
					onChange={e => functions.setNewMessage(e.target.value)}
					placeholder={`${i18n.formatMessage({ id: 'chat.message.placeholder' })} #${channel.slug}...`}
					disabled={state.isSending}
				/>
				{state.newMessage && (
					<Button
						className='aspect-square rounded-full'
						type='submit'
						disabled={state.isSending}
					>
						{state.isSending ? (
							<div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
						) : (
							<Send className='size-4' />
						)}
					</Button>
				)}
			</form>
		</div>
	)
}
