'use client'

import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

import { useI18n } from '@/utils/providers'

import { SignInForm } from './(components)/SignInForm/SignInForm'

export default function SignInPage() {
	const i18n = useI18n()

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='flex w-full max-w-4xl flex-col items-center gap-6'>
				<Card className='w-full overflow-hidden p-0'>
					<CardContent className='grid p-0 md:grid-cols-2'>
						<SignInForm />
						<div className='relative hidden md:block'>
							<Image
								src='/images/login-image.webp'
								width={500}
								height={500}
								alt='Image'
								loading='eager'
								priority={true}
								className='absolute inset-0 h-full w-full object-cover'
							/>
						</div>
					</CardContent>
				</Card>
				<div className='text-muted-foreground bg-accent *:[a]:hover:text-primary w-[75%] rounded-lg p-4 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
					{i18n.formatMessage(
						{ id: 'auth.agreement' },
						{
							terms: <a href='#'>{i18n.formatMessage({ id: 'auth.terms' })}</a>,
							privacy: <a href='#'>{i18n.formatMessage({ id: 'auth.privacy' })}</a>
						}
					)}
				</div>
			</div>
		</div>
	)
}
