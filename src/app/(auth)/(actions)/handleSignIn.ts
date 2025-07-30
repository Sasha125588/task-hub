'use server'

import { auth } from '@/lib/better-auth/auth'

export const handleSignIn = async (email: string, password: string) => {
	try {
		const data = await auth.api.signInEmail({
			body: {
				email,
				password
			}
		})

		return { data, error: null }
	} catch (error) {
		return {
			data: null,
			error: error instanceof Error ? { code: error.message } : { code: 'Unknown error' }
		}
	}
}
