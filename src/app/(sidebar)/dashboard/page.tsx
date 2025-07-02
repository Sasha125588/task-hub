import type { Metadata } from "next"

import { Statistic } from "@/components/sidebar/dashboard/Statistic"
import { LastTasks } from "@/components/sidebar/dashboard/last-tasks/LastTasks"

export const metadata: Metadata = {
	title: "Dashboard"
}

export default function DashboardPage() {
	return (
		<div className="flex w-full flex-col gap-5">
			<div className="flex-1">
				<Statistic />
			</div>
			<div className="flex-1">
				<LastTasks />
			</div>
		</div>
	)
}
