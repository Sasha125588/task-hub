import { createEvent, createStore } from 'effector'

import type { TaskSortType } from '@/types/task.types'

import { getSortTypeFromCookies } from '@/utils/helpers/task/getSortTypeFromCookies'
import { setSortTypeToCookies } from '@/utils/helpers/task/setSortTypeToCookies'

// EVENTS
export const sortTypeUpdated = createEvent<TaskSortType>()

// STORES
export const $sortType = createStore<TaskSortType>(await getSortTypeFromCookies())

$sortType.on(sortTypeUpdated, (_, newSortType) => {
	setSortTypeToCookies(newSortType)
	return newSortType
})
