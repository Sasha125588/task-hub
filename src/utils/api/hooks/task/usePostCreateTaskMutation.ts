import { useMutation } from '@tanstack/react-query'

import type { DBTask } from '@/types/db.types'

import { queryClient } from '@/utils/providers'

import { createTask } from '../../requests/client'

export const usePostCreateTaskMutation = () =>
	useMutation({
		mutationFn: (params: Partial<DBTask>) => createTask(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			queryClient.invalidateQueries({ queryKey: ['getTasksStatistics'] })
		}
	})
