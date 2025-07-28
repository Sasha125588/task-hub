import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function TaskLoading() {
	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardContent className='flex items-center gap-4'>
					<Skeleton className='size-12 rounded-lg' />

					<div className='flex flex-1 flex-col gap-3'>
						<Skeleton className='h-8 w-[200px]' />

						<div className='flex flex-wrap items-center gap-4'>
							<Skeleton className='h-5 w-[180px]' />
							<Skeleton className='h-5 w-[160px]' />
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				{[1, 2, 3].map(i => (
					<Card key={i}>
						<CardContent className='flex items-center gap-3 py-6'>
							<Skeleton className='size-12 rounded-lg' />
							<div className='flex flex-col gap-1.5'>
								<Skeleton className='h-6 w-[100px]' />
								<Skeleton className='h-4 w-[60px]' />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardContent className='flex flex-col gap-4 py-6'>
					<div className='flex items-center justify-between'>
						<Skeleton className='h-7 w-[150px]' />
						<Skeleton className='h-9 w-[120px]' />
					</div>
					{[1, 2, 3].map(i => (
						<div
							key={i}
							className='flex items-center gap-3'
						>
							<Skeleton className='size-5 rounded-sm' />
							<Skeleton className='h-5 flex-1' />
							<Skeleton className='h-5 w-[100px]' />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	)
}
