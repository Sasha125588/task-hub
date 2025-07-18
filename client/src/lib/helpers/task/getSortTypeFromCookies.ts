'use server'

import { cookies } from 'next/headers'

import { TASK_CONFIG } from '@/configs/task.config'

const SORT_TYPE = TASK_CONFIG.STORAGE_KEYS.SORT_TYPE

export const getSortTypeFromCookies = async () => {
	const cookieStore = await cookies()
	return cookieStore.get(SORT_TYPE)?.value === 'desc' ? 'desc' : 'asc'
}
