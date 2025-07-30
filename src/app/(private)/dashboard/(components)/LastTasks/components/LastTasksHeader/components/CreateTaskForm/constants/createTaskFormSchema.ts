import z from 'zod'

export const createTaskFormSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	iconName: z.string().min(1, { message: 'Icon is required' }),
	dueDate: z.date(),
	startTime: z.string().optional(),
	endTime: z.string().optional()
})
