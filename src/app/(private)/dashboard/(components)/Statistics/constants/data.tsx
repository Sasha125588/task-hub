import type { StatisticsCard } from './statistics.card.types'

export const STATISTICS_CARDS: StatisticsCard[] = [
	{
		id: 'active-projects',
		title: '92',
		desc: 'Active Projects',
		imgSrc: '/images/active-projects.svg',
		colorClass: 'bg-[#d6bcfa]',
		darkColorClass: 'dark:bg-[#6366f1]'
	},
	{
		id: 'ongoing-projects',
		title: '35',
		desc: 'On Going Projects',
		imgSrc: '/images/ongoing-projects.svg',
		colorClass: 'bg-[#faf089]',
		darkColorClass: 'dark:bg-[#ac35d4]'
	},
	{
		id: 'working-hours',
		title: '19h 3m',
		desc: 'Working Hours',
		imgSrc: '/images/working-hours.svg',
		colorClass: 'bg-[#fbb6ce]',
		darkColorClass: 'dark:bg-[#de5d8a]'
	}
]
