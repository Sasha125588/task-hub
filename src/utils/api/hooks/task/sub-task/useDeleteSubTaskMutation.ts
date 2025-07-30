import { useMutation } from '@tanstack/react-query'

import { deleteSubTask } from '@/utils/api/requests/client'
import { queryClient } from '@/utils/providers'

export const useDeleteSubTaskMutation = () =>
	useMutation({
		mutationFn: (subTaskId: string) => deleteSubTask(subTaskId),

		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getSubTasks'] })
	})
