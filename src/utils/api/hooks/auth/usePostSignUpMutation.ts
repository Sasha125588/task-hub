import { useMutation } from '@tanstack/react-query'

import { signUp } from '@/lib/better-auth/auth-client'

interface SignUpParams {
	email: string
	password: string
	username: string
}

export const usePostSignUpMutation = () =>
	useMutation({
		mutationFn: ({ email, password, username }: SignUpParams) =>
			signUp.email({
				email,
				password,
				name: username
			})
	})
