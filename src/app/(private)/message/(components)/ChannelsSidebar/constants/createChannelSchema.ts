import z from 'zod'

export const createChannelSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Channel name is required' })
		.max(50, { message: 'Channel name must be less than 50 characters' })
		.regex(/^[a-zA-Z0-9_-]+$/, {
			message: 'Channel name can only contain letters, numbers, underscores, and hyphens'
		})
})
