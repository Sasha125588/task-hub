'use client'

import { Send } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { ChatChannel, ChatMessage } from '@/types/chat.types'

import { useChatScroll } from '@/utils/hooks/useChatScroll'
import { useChatUser } from '@/utils/hooks/useChatUser'

import { ChatMessageItem } from './components/MessageItem/ChatMessageItem'
import { cn } from '@/lib/helpers/cn'

interface ChatWindowProps {
	channel: ChatChannel
	messages: ChatMessage[]
	isConnected: boolean
	onSendMessage: (message: string, channelId: number, userId: string) => void
}

export function ChatWindow({ channel, messages, onSendMessage, isConnected }: ChatWindowProps) {
	const { containerRef, scrollToBottom } = useChatScroll()
	const { userId, username } = useChatUser()

	const [newMessage, setNewMessage] = useState('')
	const [isSending, setIsSending] = useState(false)

	useEffect(() => {
		scrollToBottom()
	}, [messages, scrollToBottom])

	const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsSending(true)

		try {
			onSendMessage(newMessage, channel.id, userId!)
			setNewMessage('')
		} catch (error) {
			console.error(error)
		} finally {
			setIsSending(false)
		}
	}

	return (
		<div className='bg-background flex h-full w-full flex-col'>
			<div className='p-4'>
				<div className='flex items-center gap-2'>
					<span className='text-muted-foreground text-xl'>#</span>
					<h1 className='text-lg font-semibold'>{channel.slug}</h1>
					<div
						className={cn(
							'ml-auto h-2 w-2 rounded-full transition-colors duration-300',
							isConnected ? 'bg-green-500' : 'bg-yellow-500'
						)}
						title={isConnected ? 'Connected' : 'Connecting...'}
					/>
				</div>
			</div>

			<div
				ref={containerRef}
				className='flex-1 space-y-4 overflow-y-auto p-4'
			>
				{messages.length === 0 ? (
					<div className='text-muted-foreground text-center text-sm'>
						No messages in #{channel.slug} yet. Start the conversation!
					</div>
				) : (
					<div className='space-y-1'>
						{messages.map(message => {
							return (
								<ChatMessageItem
									key={message.id}
									message={message}
									username={username}
								/>
							)
						})}
					</div>
				)}
			</div>

			<form
				onSubmit={handleSendMessage}
				className='flex w-full gap-2 p-4'
			>
				<Input
					className='bg-background rounded-full text-sm'
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
