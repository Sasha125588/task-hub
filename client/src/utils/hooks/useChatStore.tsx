import { useEffect, useState } from 'react'

import type { ChatChannel, ChatMessage, ChatUser } from '@/types/chat.types'

import { getChannels, getMessages, getUser } from '../api'

import { supabase } from '@/lib/supabase/client'

interface UseChatStoreProps {
	channelId?: number
}

// https://github.com/supabase/supabase/blob/master/examples/slack-clone/nextjs-slack-clone/lib/Store.js

export const useChatStore = (props: UseChatStoreProps = {}) => {
	const [channels, setChannels] = useState<ChatChannel[]>([])
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [users] = useState(new Map<string, ChatUser>())
	const [newMessage, handleNewMessage] = useState<ChatMessage | null>(null)
	const [newChannel, handleNewChannel] = useState<ChatChannel | null>(null)
	const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<ChatUser | null>(null)
	const [deletedChannel, handleDeletedChannel] = useState<{ id: number } | null>(null)
	const [deletedMessage, handleDeletedMessage] = useState<{ id: number } | null>(null)

	useEffect(() => {
		const fetchChannels = async () => {
			const channels = await getChannels()
			setChannels(channels ?? [])
		}
		fetchChannels()

		const messageListener = supabase
			.channel('public:messages')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload =>
				handleNewMessage(payload.new as ChatMessage)
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, payload =>
				handleDeletedMessage(payload.old as { id: number })
			)
			.subscribe()

		const userListener = supabase
			.channel('public:users')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, payload =>
				handleNewOrUpdatedUser(payload.new as ChatUser)
			)
			.subscribe()

		const channelListener = supabase
			.channel('public:channels')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, payload =>
				handleNewChannel(payload.new as ChatChannel)
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, payload =>
				handleDeletedChannel(payload.old as { id: number })
			)
			.subscribe()

		return () => {
			supabase.removeChannel(messageListener)
			supabase.removeChannel(userListener)
			supabase.removeChannel(channelListener)
		}
	}, [])

	useEffect(() => {
		if (props?.channelId && props.channelId > 0) {
			getMessages(props.channelId, messages => {
				messages.forEach(message => users.set(message.user_id, message.author as ChatUser))
				setMessages(messages)
			})
		}
	}, [props.channelId])

	useEffect(() => {
		if (newMessage && newMessage.channel_id === Number(props.channelId)) {
			const handleAsync = async () => {
				const authorId = newMessage.user_id
				const author = users.get(authorId)
				if (!author) await getUser(authorId, user => handleNewOrUpdatedUser(user as ChatUser))
				setMessages(messages => [...messages, { ...newMessage, author }])
			}
			handleAsync()
		}
	}, [newMessage])

	useEffect(() => {
		if (deletedMessage) setMessages(messages.filter(message => message.id !== deletedMessage.id))
	}, [deletedMessage])

	useEffect(() => {
		if (newChannel) setChannels(channels => [...channels, newChannel])
	}, [newChannel])

	useEffect(() => {
		if (deletedChannel) setChannels(channels.filter(channel => channel.id !== deletedChannel.id))
	}, [deletedChannel])

	useEffect(() => {
		if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
	}, [newOrUpdatedUser])

	return {
		messages: messages.map(message => ({ ...message, author: users.get(message.user_id) })),
		channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
		users
	}
}
