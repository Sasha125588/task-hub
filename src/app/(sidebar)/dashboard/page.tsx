import type { Metadata } from "next"

import { Statistic } from "@/components/sidebar/dashboard/Statistic"
import { LastTasks } from "@/components/sidebar/dashboard/last-tasks/LastTasks"

export const metadata: Metadata = {
	title: "Dashboard"
}

export default function DashboardPage() {
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
