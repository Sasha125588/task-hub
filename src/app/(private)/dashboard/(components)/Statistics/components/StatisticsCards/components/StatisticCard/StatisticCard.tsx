import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

import { useI18n } from '@/utils/providers'

export function StatisticCard({
	title,
	description,
	imgSrc,
	colorClass,
	darkColorClass
}: {
	title: string
	description: string
	value?: number
	imgSrc: string
	colorClass: string
	darkColorClass: string
}) {
	const i18n = useI18n()

	return (
		<Card
			className={`border-border h-full w-full max-w-sm cursor-pointer border shadow ${colorClass} ${darkColorClass}`}
		>
			<CardContent className='flex items-center justify-between'>
				<div className='flex flex-col gap-1'>
					<h1 className='scroll-m-20 text-3xl font-semibold tracking-tight text-balance'>
						{title}
					</h1>
					<p className='leading-7 font-medium'>
						{i18n.formatMessage({
							id: `statistics.desc.${description}`
						})}
					</p>
				</div>
				<Image
					src={imgSrc}
					alt={title}
					width={80}
					height={80}
				/>
			</CardContent>
		</Card>
	)
}
