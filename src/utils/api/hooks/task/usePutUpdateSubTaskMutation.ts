import { useMutation } from '@tanstack/react-query'

import type { DBSubTask } from '@/types/db.types'

import { updateSubTask } from '@/utils/api/requests'
import { queryClient } from '@/utils/providers'

export const usePutUpdateSubTaskMutation = () =>
	useMutation({
		mutationFn: ({ id, params }: { id: string; params: Partial<DBSubTask> }) =>
			updateSubTask({ id, params }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getSubTasks'] })
		}
	})
