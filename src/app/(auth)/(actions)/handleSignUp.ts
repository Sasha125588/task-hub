'use server'

import { auth } from '@/lib/better-auth/auth'

export const handleSignUp = async (email: string, password: string, username: string) => {
	try {
		const data = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name: username
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
