'use server'

import { cookies } from 'next/headers'

export const setToCookies = async (key: string, value: string) => {
	const cookieStore = await cookies()

	return cookieStore.set(key, value)
}
