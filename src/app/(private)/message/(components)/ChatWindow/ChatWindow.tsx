'use client'

import { Send } from 'lucide-react'
import { motion } from 'motion/react'
import { type FormEvent, Suspense, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

import { sendMessage, useGetUserQuery } from '@/utils/api'
import { useChatScroll } from '@/utils/hooks/chat/useChatScroll'
import { useOnlineUsers } from '@/utils/hooks/chat/usePresence'
import { useRealtimeMessages } from '@/utils/hooks/chat/useRealtimeMessages'
import { useUser } from '@/utils/hooks/useUser'

import type { Database } from '../../../../../../generated/database.types'

import { MessageList } from './MessageList'
import { CreatedBy } from './components/CreatedBy/CreatedBy'

interface ChatWindowProps {
	channel: Database['public']['Tables']['channels']['Row']
}

export function ChatWindow({ channel }: ChatWindowProps) {
	const { containerRef, scrollToBottom } = useChatScroll()
	const { userId } = useUser()
	const { data } = useGetUserQuery(channel.created_by!)
	const [newMessage, setNewMessage] = useState('')
	const [isSending, setIsSending] = useState(false)

	const messages = useRealtimeMessages(channel.id)
	const onlineUsers = useOnlineUsers(channel.id, userId!)

	const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!userId) return

		setIsSending(true)
		try {
			await sendMessage({
				message: newMessage,
				channelId: channel.id,
				userId
			})
			setNewMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		} finally {
			setIsSending(false)
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom, messages])

	return (
		<div className='flex h-[780px] w-full flex-col'>
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
						<span className='text-muted-foreground text-sm'>{onlineUsers} online</span>
					</motion.div>
				</div>
				{data && <CreatedBy user={data} />}
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
						messages={messages}
						channelSlug={channel.slug!}
					/>
				</Suspense>
			</div>

			<form
				onSubmit={handleSendMessage}
				className='flex w-full max-w-xl gap-2 bg-transparent px-4'
			>
				<Input
					className='rounded-full bg-transparent text-sm'
					type='text'
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
					placeholder={`Message #${channel.slug}...`}
					disabled={isSending}
				/>
				{newMessage && (
					<Button
						className='aspect-square rounded-full'
						type='submit'
						disabled={isSending}
					>
						{isSending ? (
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
