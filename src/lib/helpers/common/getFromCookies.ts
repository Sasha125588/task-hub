import { cookies } from 'next/headers'

export const getFromCookies = async (key: string) => {
	const cookieStore = await cookies()

	return cookieStore.get(key)?.value
}
