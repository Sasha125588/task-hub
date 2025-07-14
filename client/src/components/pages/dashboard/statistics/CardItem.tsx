import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

import type { StatisticsCard } from '@/types/statistics.card.types'

interface CardItemProps {
	item: StatisticsCard
}

export function CardItem({ item }: CardItemProps) {
	return (
		<Card
			className={`border-border h-full w-full max-w-sm cursor-pointer border shadow ${item.colorClass} ${item.darkColorClass}`}
		>
			<CardContent className='flex items-center justify-between'>
				<div>
					<h1 className='scroll-m-20 text-balance text-4xl font-medium tracking-tight'>
						{item.title}
					</h1>
					<p className='font-medium leading-7'>{item.desc}</p>
				</div>
				<Image
					src={item.imgSrc}
					alt={item.title}
					width={80}
					height={80}
				/>
			</CardContent>
		</Card>
	)
}
