import Image from 'next/image'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Card, CardContent } from '@/components/ui/card'

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
						<I18nText path={`statistics.desc.${description}` as LocaleMessageId} />
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
