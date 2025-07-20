import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { usePostSignUpMutation } from '@/utils/api'

import { signUpFormSchema } from '../constants/signUpSchema'

import { getErrorMessage } from '@/lib/helpers/auth/getErrorMessage'

interface SignUpForm {
	email: string
	username: string
	password: string
	confirmPassword: string
}

export const useSignUpForm = () => {
	const router = useRouter()
	const signUpMutation = usePostSignUpMutation()

	const signUpForm = useForm<SignUpForm>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = signUpForm.handleSubmit(async values => {
		const loadingToast = toast.loading('Creating your account...')

		const { error } = await signUpMutation.mutateAsync({
			email: values.email,
			password: values.password,
			username: values.username
		})

		if (error?.code) {
			const errMsg = getErrorMessage(error.code)
			toast.error(`Failed to create account. ${errMsg}`, {
				id: loadingToast
			})
			return
		}

		toast.success('Account created successfully! Welcome to Task Hub!', {
			id: loadingToast
		})
		router.push('/dashboard')
	})

	const goToSignIn = () => router.push('/signin')

	return {
		state: {
			loading: signUpMutation.isPending
		},
		form: signUpForm,
		functions: { onSubmit, goToSignIn }
	}
}
