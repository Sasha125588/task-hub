import { useMutation } from '@tanstack/react-query'

import type { DBTask } from '@/types/db.types'

import { queryClient } from '@/utils/providers'

import { updateTask } from '../../requests'

export const usePutUpdateTaskMutation = () =>
	useMutation({
		mutationFn: ({ id, params }: { id: string; params: Partial<DBTask> }) =>
			updateTask({ id, params }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllTasks'] })
			queryClient.invalidateQueries({ queryKey: ['getTaskById'] })
		}
	})
