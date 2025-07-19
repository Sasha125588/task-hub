import { z } from 'zod'

export const TaskStatuses = ['not-started', 'completed', 'in-progress'] as const

export const taskEditFormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	dueDate: z.date().min(new Date(), { message: 'Due date must be in the future' }),
	iconName: z.string(),
	subTasks: z
		.array(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string().optional(),
				status: z.enum(TaskStatuses)
			})
		)
		.optional()
})
