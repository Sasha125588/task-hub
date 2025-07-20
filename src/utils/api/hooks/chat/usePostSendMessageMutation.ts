import { useMutation } from '@tanstack/react-query'

import { sendMessage } from '../../requests'

export interface sendMessageRequest {
	message: string
	channelId: string
	userId: string
}

export const usePostSendMessageMutation = () =>
	useMutation({ mutationFn: (props: sendMessageRequest) => sendMessage(props) })
