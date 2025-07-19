'use server'

import { cookies } from 'next/headers'

import type { TaskSortType } from '@/types/task.types'

import { TASK_CONFIG } from '@/configs/task.config'

const SORT_TYPE = TASK_CONFIG.STORAGE_KEYS.SORT_TYPE

export const setSortTypeToCookies = async (sortType: TaskSortType) => {
	const cookieStore = await cookies()
	cookieStore.set(SORT_TYPE, sortType)
}
