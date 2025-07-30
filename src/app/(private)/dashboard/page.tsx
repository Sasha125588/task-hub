import { getTasksServer } from '@/utils/api/requests/server/task/getTasksServer'

import { LastTasks } from './(components)/LastTasks/LastTasks'
import { Statistic } from './(components)/Statistics/Statistic'
import { TodayTasks } from './(components)/TodayTasks/TodayTasks'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
	const tasks = await getTasksServer()

	return (
		<div className='flex w-full flex-col gap-7'>
			<Statistic initialTasks={tasks} />
			<LastTasks initialTasks={tasks} />
			<TodayTasks initialTasks={tasks} />
		</div>
	)
}
