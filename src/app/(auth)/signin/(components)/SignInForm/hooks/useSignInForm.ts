import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { usePostSignInMutation } from '@/utils/api'

import { loginFormSchema } from '../constants/signInSchema'

import { getErrorMessage } from '@/lib/helpers/auth/getErrorMessage'

interface SignInForm {
	email: string
	password: string
}

export const useSignInForm = () => {
	const signInMutation = usePostSignInMutation()

	const signInForm = useForm<SignInForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = signInForm.handleSubmit(async values => {
		const loadingToast = toast.loading('Logging...')

		const { error } = await signInMutation.mutateAsync({
			email: values.email,
			password: values.password
		})

		if (error?.code) {
			const errMsg = getErrorMessage(error.code)
			toast.error(`Failed to login. ${errMsg}.`, {
				id: loadingToast
			})
			return
		}

		toast.success('Successfully logged in!', {
			id: loadingToast
		})
		redirect('/dashboard')
	})

	const goToSignUp = () => redirect('/signup')

	return {
		state: {
			loading: signInMutation.isPending
		},
		form: signInForm,
		functions: { onSubmit, goToSignUp }
	}
}
