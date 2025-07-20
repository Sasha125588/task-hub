import { useMutation } from '@tanstack/react-query'

import { signIn } from '@/lib/better-auth/auth-client'

interface SignInParams {
	email: string
	password: string
}

export const usePostSignInMutation = () =>
	useMutation({
		mutationFn: ({ email, password }: SignInParams) => {
			return signIn.email({
				email,
				password
			})
		}
	})
