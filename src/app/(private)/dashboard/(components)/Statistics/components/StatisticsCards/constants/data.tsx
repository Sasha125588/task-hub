import type { StatisticsCard } from '@/types/statistics.card.types'

export const STATISTICS_CARDS: StatisticsCard[] = [
	{
		id: 'all',
		title: 'all',
		description: 'Active Projects',
		imgSrc: '/images/active-projects.svg',
		colorClass: 'bg-[#d6bcfa]',
		darkColorClass: 'dark:bg-[#6366f1]'
	},
	{
		id: 'in-progress',
		title: 'in-progress',
		description: 'On Going Projects',
		imgSrc: '/images/ongoing-projects.svg',
		colorClass: 'bg-[#faf089]',
		darkColorClass: 'dark:bg-[#ac35d4]'
	},
	{
		id: 'completed',
		title: '19h 3m',
		description: 'Working Hours',
		imgSrc: '/images/working-hours.svg',
		colorClass: 'bg-[#fbb6ce]',
		darkColorClass: 'dark:bg-[#de5d8a]'
	}
]
