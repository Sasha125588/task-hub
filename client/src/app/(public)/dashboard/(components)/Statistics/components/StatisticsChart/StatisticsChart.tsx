'use client'

import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { useI18n } from '@/utils/providers'

import { CHART_DATA } from './constants/data'

export function StatisticsChart() {
	const i18n = useI18n()
	const [timeRange, setTimeRange] = useState('7d')

	const filteredData = CHART_DATA.filter(item => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')
		let daysToSubtract = 90
		if (timeRange === '30d') {
			daysToSubtract = 30
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})
	return (
		<Card className='h-full w-full'>
			<CardHeader className='flex items-center'>
				<CardTitle className='font-geist-sans text-foreground/95 flex-1 text-2xl'>
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
						projects: {
							label: i18n.formatMessage({
								id: 'statistics.chart.config.label'
							}),
							color: '#8b5cf6'
						}
					}}
				>
					<AreaChart
						accessibilityLayer
						data={filteredData}
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
							dataKey='projects'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value: string) =>
								typeof value === 'string' ? value.slice(0, 3) : value
							}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Area
							dataKey='projects'
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
