import { CardItem } from "./CardItem"
import { STATISTICS_CARDS } from "@/shared/data/dashboard-statistics.data"

export function Cards() {
	return (
		<div className="flex h-full flex-col gap-5">
			{STATISTICS_CARDS.map(item => (
				<div key={item.title} className="flex-1">
					<CardItem item={item} />
				</div>
			))}
		</div>
	)
}
