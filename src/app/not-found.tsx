'use client'

import { useRouter } from 'next/navigation'

import { Background } from '@/components/common/Background'
import { I18nText } from '@/components/common/I18nText/I18nText'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
	const router = useRouter()

	return (
		<Background>
			<div className='flex min-h-screen w-full items-center justify-center p-4'>
				<Card className='relative flex w-full max-w-2xl flex-col items-center gap-6 overflow-hidden p-8'>
					<div className='from-primary via-primary/50 absolute top-0 left-0 h-1 w-full bg-gradient-to-r to-transparent' />

					<div className='relative'>
						<h1 className='text-primary/10 text-[10rem] font-bold select-none'>404</h1>
						<p className='text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-semibold'>
							<I18nText path='not-found' />
						</p>
					</div>

					<p className='text-muted-foreground max-w-md text-center'>
						<I18nText path='not-found-description' />
					</p>

					<div className='mt-4 flex gap-4'>
						<Button
							variant='outline'
							className='cursor-pointer'
							onClick={() => router.back()}
						>
							<I18nText path='button.go-back' />
						</Button>
						<Button
							className='cursor-pointer'
							onClick={() => router.push('/dashboard')}
						>
							<I18nText path='button.go-to-dashboard' />
						</Button>
					</div>

					<div className='from-primary via-primary/50 absolute right-0 bottom-0 h-1 w-full bg-gradient-to-l to-transparent' />
				</Card>
			</div>
		</Background>
	)
}
