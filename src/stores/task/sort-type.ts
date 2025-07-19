import { createEvent, createStore } from 'effector'

import type { TaskSortType } from '@/types/task.types'

import { getSortTypeFromCookies } from '@/lib/helpers/task/getSortTypeFromCookies'
import { setSortTypeToCookies } from '@/lib/helpers/task/setSortTypeToCookies'

export const $sortType = createStore<TaskSortType>(await getSortTypeFromCookies())

export const sortTypeUpdated = createEvent<TaskSortType>()

$sortType.on(sortTypeUpdated, (_, newSortType) => {
	setSortTypeToCookies(newSortType)
	return newSortType
})
