import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { DBSubTask } from '@/types/db.types'

import { reorderSubTasks } from '@/utils/api/requests/client'

interface ReorderMutationParams {
	subTasks: DBSubTask[]
	sourceIndex: number
	destinationIndex: number
}

export const usePostReorderSubTasksMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ subTasks, sourceIndex, destinationIndex }: ReorderMutationParams) =>
			reorderSubTasks(subTasks, { sourceIndex, destinationIndex }),

		onMutate: async ({ subTasks, sourceIndex, destinationIndex }) => {
			const taskId = subTasks[0]?.task_id
			if (!taskId) return

			const queryKey = ['getSubTasks', taskId]

			await queryClient.cancelQueries({ queryKey })

			const previousSubTasks = queryClient.getQueryData<DBSubTask[]>(queryKey)

			if (previousSubTasks) {
				const optimisticSubTasks = [...previousSubTasks]
				const [movedItem] = optimisticSubTasks.splice(sourceIndex, 1)
				optimisticSubTasks.splice(destinationIndex, 0, movedItem)

				const updatedSubTasks = optimisticSubTasks.map((subTask, index) => ({
					...subTask,
					order: index + 1,
					updated_at: new Date().toISOString()
				}))

				queryClient.setQueryData(queryKey, updatedSubTasks)
			}

			return { previousSubTasks, taskId }
		},

		onError: (err, variables, context) => {
			if (context?.previousSubTasks && context?.taskId) {
				queryClient.setQueryData(['getSubTasks', context.taskId], context.previousSubTasks)
			}
		}
	})
}
