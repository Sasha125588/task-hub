import { useMutation } from '@tanstack/react-query'

import { signUp } from '@/lib/better-auth/auth-client'

interface SignUpParams {
	email: string
	password: string
	username: string
}

export const useSignUpMutation = () =>
	useMutation({
		mutationFn: ({ email, password, username }: SignUpParams) => {
			return signUp.email({
				email,
				password,
				name: username
			})
		}
	})
