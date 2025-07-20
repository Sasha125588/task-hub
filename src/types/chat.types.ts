export interface User {
	id: string
	name: string | null
	email: string
	image: string
	emailVerified: boolean
	createdAt: Date
	updatedAt: Date
}

export interface ChatChannel {
	id: string
	slug: string
	created_by: string
	inserted_at: Date
}

export interface ChatMessage {
	id: string
	message: string
	user_id: string
	channel_id: string
	inserted_at: Date
}
