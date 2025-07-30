import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/utils/providers'

import { deleteTask } from '../../requests'

export const useDeleteTaskMutation = () =>
	useMutation({
		mutationFn: (id: string) => deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			queryClient.invalidateQueries({ queryKey: ['getTasksStatistics'] })
		}
	})
