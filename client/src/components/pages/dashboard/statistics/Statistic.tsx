import { ChartAreaDefault } from "@/components/ui/chart-area-default"

import { Cards } from "./CardList"

export function Statistic() {
	return (
		<div className="">
			<div className="flex h-[450px] gap-5">
				<div className="h-full w-70">
					<Cards />
				</div>
				<div className="h-full flex-1">
					<ChartAreaDefault />
				</div>
			</div>
		</div>
	)
}
