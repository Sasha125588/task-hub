import type { ModelsCreateTaskRequest } from '@generated/api'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/utils/providers'

import { createTask } from '../../requests'

export const usePostCreateTaskMutation = () =>
	useMutation({
		mutationFn: (params: ModelsCreateTaskRequest) => createTask(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
		}
	})
