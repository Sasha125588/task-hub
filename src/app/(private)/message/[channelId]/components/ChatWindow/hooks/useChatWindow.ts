import { type FormEvent, useState } from 'react'

import type { DBChannel } from '@/types/db.types'

import { sendMessage } from '@/utils/api'
import { useGetUserQuery } from '@/utils/api/hooks/chat/useGetUserQuery'
import { useUser } from '@/utils/hooks/auth/useUser'
import { useOnlineUsers } from '@/utils/hooks/chat/useOnlineUsers'
import { useRealtimeMessages } from '@/utils/hooks/chat/useRealtimeMessages'

export const useChatWindow = (channel: DBChannel) => {
	const [newMessage, setNewMessage] = useState('')
	const [isSending, setIsSending] = useState(false)
	const { userId } = useUser()
	const { data: user } = useGetUserQuery(channel.created_by!)

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

	return {
		state: {
			messages,
			newMessage,
			isSending,
			user,
			onlineUsers
		},
		functions: {
			handleSendMessage,
			setNewMessage
		}
	}
}
