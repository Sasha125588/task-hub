import { SocialLoginButtons } from '@/components/common/SocialLoginButtons'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useI18n } from '@/utils/providers'

import { useSignInForm } from './hooks/useSignInForm'

export function SignInForm() {
	const { form, functions, state } = useSignInForm()
	const i18n = useI18n()

	return (
		<Form {...form}>
			<form
				className='p-6 md:p-8'
				onSubmit={event => {
					event.preventDefault()
					functions.onSubmit()
				}}
			>
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col items-center text-center'>
						<h1 className='text-2xl font-bold'>
							{i18n.formatMessage({ id: 'auth.signin.form.title' })}
						</h1>
						<p className='text-muted-foreground text-balance'>
							{i18n.formatMessage({ id: 'auth.signin.form.description' })}
						</p>
					</div>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='email'>
									{i18n.formatMessage({ id: 'field.email.label' })}
								</FormLabel>
								<FormControl>
									<Input
										id='email'
										aria-label='Email'
										type='email'
										placeholder={i18n.formatMessage({
											id: 'field.email.placeholder'
										})}
										disabled={state.loading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center'>
									<FormLabel htmlFor='password'>
										{i18n.formatMessage({ id: 'field.password.label' })}
									</FormLabel>
									<a
										href='#'
										className='ml-auto text-sm underline-offset-2 hover:underline'
									>
										{i18n.formatMessage({ id: 'auth.form.forgotPassword' })}
									</a>
								</div>
								<FormControl>
									<Input
										id='password'
										aria-label='Password'
										type='password'
										placeholder={i18n.formatMessage({
											id: 'field.password.placeholder'
										})}
										disabled={state.loading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
								<p className='text-muted-foreground mt-2 text-sm'>
									{i18n.formatMessage({ id: 'auth.form.passwordRequirements' })}
								</p>
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full cursor-pointer dark:hover:bg-zinc-50/80'
						disabled={state.loading}
					>
						{state.loading
							? i18n.formatMessage({ id: 'site.loading' })
							: i18n.formatMessage({ id: 'button.login' })}
					</Button>
					<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
						<span className='bg-card text-muted-foreground relative z-10 px-2'>
							{i18n.formatMessage({ id: 'auth.form.orContinueWith' })}
						</span>
					</div>
					<SocialLoginButtons />
					<div className='text-center text-sm'>
						{i18n.formatMessage({ id: 'auth.form.dontHaveAccount' })}{' '}
						<Button
							type='button'
							variant='link'
							className='h-auto cursor-pointer p-0'
							onClick={functions.goToSignUp}
						>
							{i18n.formatMessage({ id: 'button.signup' })}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
