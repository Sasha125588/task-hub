import type { ICardItem } from "@/components/sidebar/dashboard/statistics/types"

export const STATISTICS_CARDS: ICardItem[] = [
	{
		title: "92",
		desc: "Active Projects",
		imgSrc: "/images/active-projects.svg",
		colorClass: "bg-[#d6bcfa]",
		darkColorClass: "dark:bg-[#6366f1]"
	},
	{
		title: "35",
		desc: "On Going Project",
		imgSrc: "/images/ongoing-projects.svg",
		colorClass: "bg-[#faf089]",
		darkColorClass: "dark:bg-[#ac35d4]"
	},
	{
		title: "19h 3m",
		desc: "Working Hours",
		imgSrc: "/images/working-hours.svg",
		colorClass: "bg-[#fbb6ce]",
		darkColorClass: "dark:bg-[#de5d8a]"
	}
]
