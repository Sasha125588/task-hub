import { createEvent, createStore } from 'effector'

import type { TStatusFilter } from '@/types/task.types'

import type { ModelsSubTask } from '../../../generated/api'

// STORES
export const $statusType = createStore<TStatusFilter>('all')

// EVENTS
export const statusTypeUpdated = createEvent<TStatusFilter>()

export const subTasksReorderer = createEvent<{
	taskId: string
	subTasks: ModelsSubTask[]
}>()

$statusType.on(statusTypeUpdated, (_, newStatusType) => {
	return newStatusType
})
