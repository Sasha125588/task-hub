'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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

import { useI18n } from '@/utils/providers'

import type { Chart } from './constants/types'

export function StatisticsChart({ tasks }: { tasks: DBTask[] }) {
	const i18n = useI18n()
	const [timeRange, setTimeRange] = useState('7d')

	const chartData = useMemo(() => {
		const tasksByDate = new Map<string, number>()

		const now = new Date()
		const daysToShow = timeRange === '90d' ? 90 : timeRange === '30d' ? 30 : 7
		const startDate = new Date()
		startDate.setDate(startDate.getDate() - daysToShow)

		for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
			const dateStr = d.toISOString().split('T')[0]
			tasksByDate.set(dateStr, 0)
		}

		tasks.forEach(task => {
			const createdAt = new Date(task.created_at!)
			if (createdAt >= startDate && createdAt <= now) {
				const dateStr = createdAt.toISOString().split('T')[0]
				tasksByDate.set(dateStr, (tasksByDate.get(dateStr) || 0) + 1)
			}
		})

		const data: Chart[] = Array.from(tasksByDate.entries()).map(([date, count]) => ({
			date,
			month: new Date(date).toLocaleString('default', { month: 'long' }),
			tasks: count
		}))

		return data.sort((a, b) => a.date.localeCompare(b.date))
	}, [tasks, timeRange])

	return (
		<Card className='h-full w-full'>
			<CardHeader className='flex items-center'>
				<CardTitle className='text-foreground/95 flex-1 text-2xl'>
					{i18n.formatMessage({ id: 'statistics.chart.title' })}
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
								{i18n.formatMessage({ id: 'statistics.chart.yearly' })}
							</SelectItem>
							<SelectItem value='30d'>
								{i18n.formatMessage({ id: 'statistics.chart.monthly' })}
							</SelectItem>
							<SelectItem value='7d'>
								{i18n.formatMessage({ id: 'statistics.chart.weekly' })}
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
							label: i18n.formatMessage({
								id: 'statistics.chart.config.label'
							}),
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
