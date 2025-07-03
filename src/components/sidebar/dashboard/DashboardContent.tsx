import { LastTasks } from "./last-tasks/LastTasks"
import { Statistic } from "./statistics/Statistic"

export function DashboardContent() {
	return (
		<div className="flex w-full flex-col gap-7">
			<div className="">
				<Statistic />
			</div>
			<div className="">
				<LastTasks />
			</div>
		</div>
	)
}
