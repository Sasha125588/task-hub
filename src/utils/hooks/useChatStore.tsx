import { useEffect, useState } from 'react'

import type { ChatChannel, ChatMessage, User } from '@/types/chat.types'

import { getChannels, getMessages, getUser } from '../api'

import { supabase } from '@/lib/supabase/client'

interface UseChatStoreProps {
	channelId?: string
}

// https://github.com/supabase/supabase/blob/master/examples/slack-clone/nextjs-slack-clone/lib/Store.js

export const useChatStore = (props: UseChatStoreProps = {}) => {
	const [channels, setChannels] = useState<ChatChannel[]>([])
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [users] = useState(new Map<string, string>())
	const [newMessage, handleNewMessage] = useState<ChatMessage | null>(null)
	const [newChannel, handleNewChannel] = useState<ChatChannel | null>(null)
	const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<User | null>(null)
	const [deletedChannel, handleDeletedChannel] = useState<{ id: string } | null>(null)
	const [deletedMessage, handleDeletedMessage] = useState<{ id: string } | null>(null)

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
				handleDeletedMessage(payload.old as { id: string })
			)
			.subscribe()

		const userListener = supabase
			.channel('public:users')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'user' }, payload =>
				handleNewOrUpdatedUser(payload.new as User)
			)
			.subscribe()

		const channelListener = supabase
			.channel('public:channels')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, payload =>
				handleNewChannel(payload.new as ChatChannel)
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, payload =>
				handleDeletedChannel(payload.old as { id: string })
			)
			.subscribe()

		return () => {
			supabase.removeChannel(messageListener)
			supabase.removeChannel(userListener)
			supabase.removeChannel(channelListener)
		}
	}, [])

	useEffect(() => {
		if (props?.channelId) {
			getMessages(props.channelId, messages => {
				messages.forEach(message => users.set(message.user_id, message.user_id))
				setMessages(messages)
			})
		}
	}, [props.channelId])

	useEffect(() => {
		if (newMessage && newMessage.channel_id === props.channelId) {
			const authorId = newMessage.user_id
			const author = users.get(authorId)

			if (!author) {
				getUser(authorId).then(user => {
					if (user) {
						handleNewOrUpdatedUser(user)
					}
				})
			}

			setMessages(messages => [...messages, { ...newMessage, author }])
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
		if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser.id)
	}, [newOrUpdatedUser])

	return {
		messages: messages.map(message => ({ ...message, author: users.get(message.user_id) })),
		channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
		users
	}
}
