import { Statistic } from '@/app/(private)/dashboard/task/[id]/(components)/TaskPage/components/Statistic/Statistic'
import { SubTasksList } from '@/app/(private)/dashboard/task/[id]/(components)/TaskPage/components/TasksList/SubTasksList'
import { TodayTasks } from '@/app/(private)/dashboard/task/[id]/(components)/TaskPage/components/Timeline/TodayTasks'

export function TaskPage({ id }: { id: string }) {
	return (
		<div className='flex flex-col gap-4'>
			<h1>Task Page</h1>
			<Statistic />
			<TodayTasks />
			<SubTasksList id={id} />
		</div>
	)
}
