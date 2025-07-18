import { useSession } from '@/lib/better-auth/auth-client'

export const useChatUser = () => {
	const { data: session, isPending } = useSession()

	const currentUser = session?.user
	const userId = currentUser?.id
	const username = currentUser?.name || currentUser?.email || 'Anonymous'

	return {
		currentUser,
		userId,
		username,
		isLoading: isPending
	}
}
