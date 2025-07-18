export interface ChatUser {
	id: string
	username: string | null
	status: 'ONLINE' | 'OFFLINE'
}

export interface ChatChannel {
	id: number
	inserted_at: string
	slug: string
	created_by: string
}

export interface ChatMessage {
	id: number
	inserted_at: string
	message: string
	user_id: string
	channel_id: number
	author?: ChatUser
}

export interface ChatState {
	channels: ChatChannel[]
	messages: ChatMessage[]
	users: Map<string, ChatUser>
	currentChannelId: number | null
	isConnected: boolean
	isLoading: boolean
}
