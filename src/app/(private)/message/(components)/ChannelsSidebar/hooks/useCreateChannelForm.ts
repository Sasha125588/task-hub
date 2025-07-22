import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createChannel } from '@/utils/api'
import { useUser } from '@/utils/hooks/useUser'

import { createChannelSchema } from '../constants/createChannelSchema'
import { useState } from 'react'

interface CreateChannelForm {
	name: string
}

interface UseCreateChannelFormProps {
	onClose: () => void
}

export const useCreateChannelForm = ({ onClose }: UseCreateChannelFormProps) => {
	const router = useRouter()
	const { userId } = useUser()
	const [loading, setLoading] = useState(false)

	const createChannelForm = useForm<CreateChannelForm>({
		resolver: zodResolver(createChannelSchema),
		defaultValues: {
			name: ''
		}
	})

	const onSubmit = createChannelForm.handleSubmit(async values => {
		if (!userId) return

		const loadingToast = toast.loading('Creating channel...')

		try {
			setLoading(true)
			const data = await createChannel(values.name,userId)

			if (data) {
				toast.success('Channel created successfully!', {
					id: loadingToast
				})
				router.push(`/message/${data.id}`)
				onClose()
			}
		} catch (error) {
            console.log(error)
			toast.error('Failed to create channel.', {
				id: loadingToast
			})
		} finally {
			setLoading(false)
		}
	})

	return {
		state: {
			loading
		},
		form: createChannelForm,
		functions: { onSubmit }
	}
} 