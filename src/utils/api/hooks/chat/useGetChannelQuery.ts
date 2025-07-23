import { useQuery } from '@tanstack/react-query'

import { getChannel } from '@/utils/api/requests/chat/channels/getChannel'

export const useGetChannelQuery = (channelId: string) =>
	useQuery({
		queryKey: ['getChannel', channelId],
		queryFn: async () => await getChannel(channelId)
	})
