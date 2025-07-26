import { useMutation } from '@tanstack/react-query'

import { type CreateSubTaskParams, createSubTask } from '@/utils/api/requests'
import { queryClient } from '@/utils/providers'

export const usePostCreateSubTaskMutation = () =>
	useMutation({
		mutationFn: ({ taskId, body }: { taskId: string; body: CreateSubTaskParams }) =>
			createSubTask(taskId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getSubTasks'] })
		}
	})
