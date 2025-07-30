import { useMutation } from '@tanstack/react-query'

import { type CreateSubTaskParams, createSubTask } from '@/utils/api/requests'
import { queryClient } from '@/utils/providers'

export const usePostCreateSubTaskMutation = () =>
	useMutation({
		mutationFn: async ({ taskId, body }: { taskId: string; body: CreateSubTaskParams }) =>
			await createSubTask(taskId, body),
		onSuccess: data => {
			if (data?.task_id) {
				queryClient.invalidateQueries({ queryKey: ['getSubTasks', data.task_id] })
				queryClient.invalidateQueries({ queryKey: ['getTaskById', data.task_id] })
				queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			}
		}
	})
