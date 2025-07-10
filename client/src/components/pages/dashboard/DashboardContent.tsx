import { TaskList } from "./last-tasks/TaskList"
import { Statistic } from "./statistics/Statistic"
import { TodayTasksTimeline } from "./statistics/TodayTasksTimeline"

export function DashboardContent() {
	return (
		<div className="flex w-full flex-col gap-7">
			<div>
				<Statistic />
			</div>
			<div>
				<TaskList />
			</div>
			<div>
				<TodayTasksTimeline />
			</div>
		</div>
	)
}
