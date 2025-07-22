import z from 'zod'

export const createChannelSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Channel name is required' })
		.max(50, { message: 'Channel name must be less than 50 characters' })
		.regex(/^[a-z0-9-]+$/, {
			message: 'Channel name can only contain lowercase letters, numbers, and hyphens'
		})
}) 