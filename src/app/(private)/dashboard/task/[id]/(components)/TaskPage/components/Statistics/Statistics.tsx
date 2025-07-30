import { getRandomColor } from '@/utils/helpers/common/getRandomColor'

import { StatisticsCard } from './components/StatisticsCard/StatisticsCard'
import { statisticData } from './constants/data'

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
						key={card.id}
						card={card}
						value={value}
						randomColor={randomColor}
					/>
				)
			})}
		</div>
	)
}
