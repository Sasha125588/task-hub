import { useMutation } from '@tanstack/react-query'

import type { DBSubTask } from '@/types/db.types'

import { updateSubTask } from '@/utils/api/requests'
import { queryClient } from '@/utils/providers'

export const usePutUpdateSubTaskMutation = () =>
	useMutation({
		mutationFn: async ({ id, params }: { id: string; params: Partial<DBSubTask> }) =>
			await updateSubTask({ id, params }),
		onSuccess: data => {
			if (data?.task_id) {
				queryClient.invalidateQueries({ queryKey: ['getSubTasks', data.task_id] })
				queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			}
		}
	})
