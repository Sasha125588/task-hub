import { CardItem } from "./CardItem"

export interface ICardItem {
	title: string
	colorClass: string
	darkColorClass: string
	desc: string
	imgSrc: string
}

const data: ICardItem[] = [
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

export function Cards() {
	return (
		<div className="flex h-full flex-col gap-5">
			{data.map(item => (
				<div key={item.title} className="flex-1">
					<CardItem item={item} />
				</div>
			))}
		</div>
	)
}
