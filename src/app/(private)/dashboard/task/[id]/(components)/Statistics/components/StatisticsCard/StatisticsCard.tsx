import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'

export function StatisticsCard({
	card,
	randomColor,
	value
}: {
	card: { title: string; desc: string; imgSrc: string }
	randomColor: string
	value: number
}) {
	return (
		<div
			className={`w-full flex-1 rounded-xl`}
			style={{
				backgroundColor: randomColor
			}}
		>
			<Card className='w-full max-w-sm cursor-pointer border shadow-sm transition-all duration-300 hover:translate-x-2 hover:-translate-y-2'>
				<CardContent className='flex h-full flex-col gap-2'>
					<h3 className='text-foreground text-lg font-semibold'>{card.title}</h3>

					<div className='flex items-center gap-3'>
						<div
							className={`flex size-16 items-center justify-center rounded-full`}
							style={{
								backgroundColor: randomColor
							}}
						>
							<Image
								src={card.imgSrc}
								alt={card.title}
								width={32}
								height={32}
								className='text-white'
							/>
						</div>
						<div className='flex flex-col'>
							<p className='text-foreground text-3xl font-semibold'>{value}</p>
							<p className='text-muted-foreground overflow-hidden text-sm tracking-tight text-ellipsis'>
								{card.desc}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
