import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

import { SignUpForm } from './(components)/SignUpForm/SignUpForm'

export default function SignUpPage() {
	return (
		<div className='flex w-full items-center justify-center p-4'>
			<div className='flex w-full max-w-4xl flex-col items-center gap-6'>
				<Card className='w-full overflow-hidden p-0'>
					<CardContent className='grid p-0 md:grid-cols-2'>
						<SignUpForm />
						<div className='relative hidden md:block'>
							<Image
								src='/images/login-image.webp'
								width={500}
								height={500}
								alt='Image'
								className='absolute inset-0 h-full w-full object-cover'
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
