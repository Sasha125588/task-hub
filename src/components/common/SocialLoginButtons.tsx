import { Button } from '@/components/ui/button'

import { usePostAuthWithProviderMutation } from '@/utils/api'

export function SocialLoginButtons() {
	const authWithProvider = usePostAuthWithProviderMutation()
	const handleAuth = (provider: string) => authWithProvider.mutateAsync(provider)
	return (
		<div className='grid grid-cols-2 gap-4'>
			<Button
				variant='outline'
				type='button'
				className='w-full cursor-pointer bg-white! text-black transition-all duration-200 ease-in hover:bg-black!'
				onClick={() => handleAuth('github')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
					<path d='M9 18c-4.51 2-5-2-7-2' />
				</svg>
				<span className='sr-only'>Login with GitHub</span>
			</Button>
			<Button
				variant='outline'
				type='button'
				className='w-full cursor-pointer bg-white! text-black transition-all duration-200 ease-in hover:bg-black!'
				onClick={() => handleAuth('google')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
				>
					<path
						d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
						fill='currentColor'
					/>
				</svg>
				<span className='sr-only'>Login with Google</span>
			</Button>
		</div>
	)
}
