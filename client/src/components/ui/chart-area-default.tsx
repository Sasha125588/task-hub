"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/components/ui/chart"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

interface ICharsData {
	date: string
	month: string
	projects: number
}

export const description = "A simple area chart"

const chartData: ICharsData[] = [
	{ date: "2024-04-01", month: "April", projects: 372 },
	{ date: "2024-04-02", month: "April", projects: 277 },
	{ date: "2024-04-03", month: "April", projects: 287 },
	{ date: "2024-04-04", month: "April", projects: 502 },
	{ date: "2024-04-05", month: "April", projects: 663 },
	{ date: "2024-04-06", month: "April", projects: 641 },
	{ date: "2024-04-07", month: "April", projects: 425 },
	{ date: "2024-04-08", month: "April", projects: 729 },
	{ date: "2024-04-09", month: "April", projects: 169 },
	{ date: "2024-04-10", month: "April", projects: 451 },
	{ date: "2024-04-11", month: "April", projects: 677 },
	{ date: "2024-04-12", month: "April", projects: 502 },
	{ date: "2024-04-13", month: "April", projects: 722 },
	{ date: "2024-04-14", month: "April", projects: 357 },
	{ date: "2024-05-04", month: "May", projects: 805 },
	{ date: "2024-05-05", month: "May", projects: 871 },
	{ date: "2024-05-06", month: "May", projects: 1018 },
	{ date: "2024-05-07", month: "May", projects: 688 },
	{ date: "2024-05-08", month: "May", projects: 359 },
	{ date: "2024-05-09", month: "May", projects: 407 },
	{ date: "2024-05-10", month: "May", projects: 623 },
	{ date: "2024-05-11", month: "May", projects: 605 },
	{ date: "2024-05-12", month: "May", projects: 437 },
	{ date: "2024-05-13", month: "May", projects: 357 },
	{ date: "2024-05-14", month: "May", projects: 938 },
	{ date: "2024-05-15", month: "May", projects: 853 },
	{ date: "2024-05-16", month: "May", projects: 738 },
	{ date: "2024-05-17", month: "May", projects: 919 },
	{ date: "2024-05-18", month: "May", projects: 665 },
	{ date: "2024-05-19", month: "May", projects: 415 },
	{ date: "2024-05-20", month: "May", projects: 407 },
	{ date: "2024-05-21", month: "May", projects: 222 },
	{ date: "2024-05-22", month: "May", projects: 201 },
	{ date: "2024-05-23", month: "May", projects: 542 },
	{ date: "2024-06-19", month: "June", projects: 631 },
	{ date: "2024-06-20", month: "June", projects: 858 },
	{ date: "2024-06-21", month: "June", projects: 379 },
	{ date: "2024-06-22", month: "June", projects: 587 },
	{ date: "2024-06-23", month: "June", projects: 1010 },
	{ date: "2024-06-24", month: "June", projects: 312 },
	{ date: "2024-06-25", month: "June", projects: 331 },
	{ date: "2024-06-26", month: "June", projects: 814 },
	{ date: "2024-06-27", month: "June", projects: 938 },
	{ date: "2024-06-28", month: "June", projects: 349 },
	{ date: "2024-06-29", month: "June", projects: 263 },
	{ date: "2024-06-30", month: "June", projects: 846 }
]

const chartConfig = {
	projects: {
		label: "Projects",
		color: "#8b5cf6"
	}
} satisfies ChartConfig

export function ChartAreaDefault() {
	const [timeRange, setTimeRange] = useState("7d")

	const filteredData = chartData.filter(item => {
		const date = new Date(item.date)
		const referenceDate = new Date("2024-06-30")
		let daysToSubtract = 90
		if (timeRange === "30d") {
			daysToSubtract = 30
		} else if (timeRange === "7d") {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})
	return (
		<Card className="h-full w-full">
			<CardHeader className="flex items-center">
				<CardTitle className="font-geist-sans text-foreground/95 flex-1 text-2xl">
					Projects Statistic
				</CardTitle>
				<CardAction>
					<Select
						defaultValue="7d"
						value={timeRange}
						onValueChange={setTimeRange}
					>
						<SelectTrigger
							className="hidden w-[130px] sm:ml-auto sm:flex"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="90d">Yearly</SelectItem>
							<SelectItem value="30d">Monthly</SelectItem>
							<SelectItem value="7d">Weekly</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="h-[calc(100%-80px)]">
				<ChartContainer className="h-full w-full" config={chartConfig}>
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
							<linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
								<stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={value => {
								const date = new Date(value)
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric"
								})
							}}
						/>
						<YAxis
							dataKey="projects"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value: string) =>
								typeof value === "string" ? value.slice(0, 3) : value
							}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="projects"
							type="bump"
							fill="url(#projectsGradient)"
							animationDuration={500}
							stroke="#8b5cf6"
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
