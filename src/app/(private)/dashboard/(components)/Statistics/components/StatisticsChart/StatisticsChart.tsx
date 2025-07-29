import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import type { DBTask } from '@/types/db.types'

export function StatisticsChart({ tasks }: { tasks: DBTask[] }) {
	const [timeRange, setTimeRange] = useState('7d')

	const chartData = useMemo(() => {
		const daysMap = { '7d': 7, '30d': 30, '90d': 90 } as const
		const daysToShow = daysMap[timeRange as keyof typeof daysMap] || 7

		const now = new Date()
		const startDate = new Date(now)
		startDate.setDate(startDate.getDate() - daysToShow)

		const dateRange = Array.from({ length: daysToShow + 1 }, (_, i) => {
			const date = new Date(startDate)
			date.setDate(startDate.getDate() + i)
			return date.toISOString().split('T')[0] // 2025-07-29T11:47:44.737Z
		})

		const taskCounts = tasks.reduce(
			(acc, task) => {
				const taskDate = new Date(task.created_at!).toISOString().split('T')[0]
				if (dateRange.includes(taskDate)) {
					acc[taskDate] = (acc[taskDate] ?? 0) + 1
				}
				return acc
			},
			{} as Record<string, number>
		)

		return dateRange.map(date => ({
			date,
			month: new Date(date).toLocaleString('default', { month: 'long' }),
			tasks: taskCounts[date] || 0
		}))
	}, [tasks, timeRange])

	return (
		<Card className='h-full w-full'>
			<CardHeader className='flex items-center'>
				<CardTitle className='text-foreground/95 flex-1 text-2xl'>
					<I18nText path='statistics.chart.title' />
				</CardTitle>
				<CardAction>
					<Select
						defaultValue='7d'
						value={timeRange}
						onValueChange={setTimeRange}
					>
						<SelectTrigger
							className='hidden w-[130px] sm:ml-auto sm:flex'
							aria-label='Select a value'
						>
							<SelectValue placeholder='Last 3 months' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='90d'>
								<I18nText path='statistics.chart.yearly' />
							</SelectItem>
							<SelectItem value='30d'>
								<I18nText path='statistics.chart.monthly' />
							</SelectItem>
							<SelectItem value='7d'>
								<I18nText path='statistics.chart.weekly' />
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className='h-[calc(100%-80px)]'>
				<ChartContainer
					className='h-full w-full'
					config={{
						tasks: {
							label: <I18nText path='statistics.chart.config.label' />,
							color: '#8b5cf6'
						}
					}}
				>
					<AreaChart
						accessibilityLayer
						data={chartData}
						width={undefined}
						height={undefined}
						margin={{
							left: -24,
							right: 12
						}}
					>
						<defs>
							<linearGradient
								id='projectsGradient'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='0%'
									stopColor='#8b5cf6'
									stopOpacity={0.3}
								/>
								<stop
									offset='100%'
									stopColor='#8b5cf6'
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={value => {
								const date = new Date(value)
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})
							}}
						/>
						<YAxis
							dataKey='tasks'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value: number) => Math.round(value).toString()}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Area
							dataKey='tasks'
							type='bump'
							fill='url(#projectsGradient)'
							animationDuration={500}
							stroke='#8b5cf6'
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
