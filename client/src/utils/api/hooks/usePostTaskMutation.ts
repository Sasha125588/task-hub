import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/utils/providers'

import type { ModelsCreateTaskRequest } from '../../../../generated/api'
import { createTask } from '../requests'

export const useCreateTask = () =>
	useMutation({
		mutationFn: (params: ModelsCreateTaskRequest) => createTask({ params }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
		}
	})
