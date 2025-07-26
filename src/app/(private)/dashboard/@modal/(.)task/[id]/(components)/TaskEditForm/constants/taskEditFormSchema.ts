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
				task_id: z.string(),
				title: z.string(),
				description: z.string().nullable().optional(),
				completed: z.boolean(),
				order: z.number(),
				tags: z.array(z.string()).nullable().optional(),
				created_at: z.string().nullable().optional(),
				updated_at: z.string().nullable().optional()
			})
		)
		.optional()
})
