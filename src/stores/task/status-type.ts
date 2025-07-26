import { createEvent, createStore } from 'effector'

import type { TStatusFilter } from '@/types/task.types'

// EVENTS
export const statusTypeUpdated = createEvent<TStatusFilter>()

// STORES
export const $statusType = createStore<TStatusFilter>('all')

$statusType.on(statusTypeUpdated, (_, newStatusType) => {
	return newStatusType
})
