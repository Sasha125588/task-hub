import { useSession } from '@/lib/better-auth/auth-client'

export const useUser = () => {
	const { data, isPending } = useSession()

	const currentUser = data?.user
	const userId = currentUser?.id
	const username = currentUser?.name || currentUser?.email || 'Anonymous'

	return {
		currentUser,
		userId,
		username,
		isPending
	}
}
