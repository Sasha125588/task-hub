import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

import type { ICardItem } from "./types"

export function CardItem({ item }: { item: ICardItem }) {
	return (
		<Card
			className={`border-border h-full w-full max-w-sm border shadow ${item.colorClass} ${item.darkColorClass}`}
		>
			<CardContent className="flex items-center justify-between">
				<div>
					<h1 className="scroll-m-20 text-4xl font-medium tracking-tight text-balance">
						{item.title}
					</h1>
					<p className="leading-7 font-medium">{item.desc}</p>
				</div>
				<Image src={item.imgSrc} alt={item.title} width={80} height={80} />
			</CardContent>
		</Card>
	)
}
