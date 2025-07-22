import { useMutation } from '@tanstack/react-query'

import { signIn } from '@/lib/better-auth/auth-client'

export const usePostAuthWithProviderMutation = () =>
	useMutation({
		mutationFn: (provider: string) => {
			return signIn.social({ provider })
		}
	})
