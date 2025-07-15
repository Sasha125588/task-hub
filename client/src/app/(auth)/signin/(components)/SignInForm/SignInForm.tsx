'use client'

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

import { useSignInForm } from './hooks/useSignInForm'

export function SignInForm() {
	const { form, functions, state } = useSignInForm()

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
						<h1 className='text-2xl font-bold'>Welcome back</h1>
						<p className='text-muted-foreground text-balance'>
							Login to your Task Hub account
						</p>
					</div>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<FormControl>
									<Input
										id='email'
										aria-label='Email'
										type='email'
										placeholder='m@example.com'
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
									<FormLabel htmlFor='password'>Password</FormLabel>
									<a
										href='#'
										className='ml-auto text-sm underline-offset-2 hover:underline'
									>
										Forgot your password?
									</a>
								</div>
								<FormControl>
									<Input
										id='password'
										aria-label='Password'
										type='password'
										placeholder='********'
										disabled={state.loading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
								<p className='text-muted-foreground mt-2 text-sm'>
									Password must be at least 8 characters and contain uppercase,
									lowercase, and numbers
								</p>
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full cursor-pointer dark:hover:bg-zinc-50/80'
						disabled={state.loading}
					>
						{state.loading ? 'Logging in...' : 'Login'}
					</Button>
					<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
						<span className='bg-card text-muted-foreground relative z-10 px-2'>
							Or continue with
						</span>
					</div>
					<SocialLoginButtons />
					<div className='text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Button
							type='button'
							variant='link'
							className='h-auto cursor-pointer p-0'
							onClick={functions.goToSignUp}
						>
							Sign up
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
