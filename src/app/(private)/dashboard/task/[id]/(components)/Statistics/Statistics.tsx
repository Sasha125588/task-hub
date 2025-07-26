import { v4 as uuidv4 } from 'uuid'

import { getRandomColor } from '@/utils/helpers/common/getRandomColor'

import { statisticData } from './constants/data'
import { StatisticsCard } from '@/app/(private)/dashboard/task/[id]/(components)/Statistics/components/StatisticsCard/StatisticsCard'

export const Statistics = function Statistics({
	statistics
}: {
	statistics: { all: number; completed: number; 'not-started': number }
}) {
	return (
		<div className='flex gap-3'>
			{statisticData.map(card => {
				const value = statistics[card.value as keyof typeof statistics]
				const randomColor = getRandomColor()

				return (
					<StatisticsCard
						key={uuidv4()}
						card={card}
						value={value}
						randomColor={randomColor}
					/>
				)
			})}
		</div>
	)
}
