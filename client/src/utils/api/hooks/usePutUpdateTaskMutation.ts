import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/utils/providers'

import type { ModelsUpdateTaskRequest } from '../../../../generated/api'
import { updateTask } from '../requests'

export const useUpdateTask = () =>
	useMutation({
		mutationFn: ({ id, params }: { id: string; params: ModelsUpdateTaskRequest }) =>
			updateTask({ id, params }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			queryClient.invalidateQueries({ queryKey: ['getTaskById'] })
		}
	})
