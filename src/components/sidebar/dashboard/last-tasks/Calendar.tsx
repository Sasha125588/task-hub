"use client"

import { Calendar, Phone, Plane, Users } from "lucide-react"
import React, { useState } from "react"

const DailyTasksCalendar = () => {
	const [tasks] = useState([
		{
			id: 1,
			title: "Travel App User Flow",
			startTime: "10:00",
			endTime: "13:30",
			startHour: 10,
			duration: 3.5,
			color: "bg-purple-400",
			icon: Plane,
			participants: [
				{ name: "Alice", avatar: "👩‍💼" },
				{ name: "Bob", avatar: "👨‍💻" },
				{ name: "Carol", avatar: "👩‍🎨" }
			]
		},
		{
			id: 2,
			title: "Team Meeting",
			startTime: "14:00",
			endTime: "15:00",
			startHour: 14,
			duration: 1,
			color: "bg-blue-400",
			icon: Users,
			participants: [
				{ name: "David", avatar: "👨‍💼" },
				{ name: "Eve", avatar: "👩‍💻" }
			]
		},
		{
			id: 3,
			title: "Client Call",
			startTime: "15:30",
			endTime: "16:30",
			startHour: 15.5,
			duration: 1,
			color: "bg-green-400",
			icon: Phone,
			participants: [{ name: "Client", avatar: "🤝" }]
		}
	])

	const hours = Array.from({ length: 9 }, (_, i) => i + 9) // 9am to 5pm

	const formatHour = (hour: number) => {
		if (hour === 12) return "12 pm"
		if (hour > 12) return `${hour - 12} pm`
		return `${hour} am`
	}

	const getTaskPosition = task => {
		const startPosition = ((task.startHour - 9) / 8) * 100
		const width = (task.duration / 8) * 100
		return { left: `${startPosition}%`, width: `${width}%` }
	}

	return (
		<div className="mx-auto min-h-screen max-w-6xl bg-gray-50 p-6">
			<div className="rounded-xl bg-white p-6 shadow-sm">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Calendar className="h-8 w-8 text-gray-700" />
						<h1 className="text-2xl font-semibold text-gray-800">
							Today Tasks
						</h1>
					</div>

					{/* Team members */}
					<div className="flex items-center space-x-2">
						<div className="flex -space-x-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-400 font-medium text-white">
								👩‍💼
							</div>
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-400 font-medium text-white">
								👨‍💻
							</div>
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-pink-400 font-medium text-white">
								👩‍🎨
							</div>
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-400 font-medium text-white">
								👨‍💼
							</div>
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-purple-300 text-sm font-medium">
								+6
							</div>
						</div>
					</div>
				</div>

				{/* Time Grid */}
				<div className="relative">
					{/* Hour markers */}
					<div className="mb-4 flex items-center">
						{hours.map(hour => (
							<div key={hour} className="flex-1 text-center">
								<span className="text-sm font-medium text-gray-500">
									{formatHour(hour)}
								</span>
							</div>
						))}
					</div>

					{/* Time line */}
					<div className="relative mb-4 h-24">
						{/* Background grid lines */}
						<div className="absolute inset-0 flex">
							{hours.map(hour => (
								<div
									key={hour}
									className="flex-1 border-l border-gray-200 first:border-l-0"
								></div>
							))}
						</div>

						{/* Tasks */}
						{tasks.map(task => {
							const position = getTaskPosition(task)
							const IconComponent = task.icon

							return (
								<div
									key={task.id}
									className={`absolute ${task.color} cursor-pointer rounded-lg p-3 shadow-sm transition-shadow hover:shadow-md`}
									style={{
										...position,
										top: "8px",
										height: "calc(100% - 16px)"
									}}
								>
									<div className="flex h-full items-start space-x-2">
										<div className="bg-opacity-20 flex-shrink-0 rounded-full bg-white p-1.5">
											<IconComponent className="h-4 w-4 text-white" />
										</div>

										<div className="min-w-0 flex-1">
											<h3 className="mb-1 text-sm leading-tight font-medium text-white">
												{task.title}
											</h3>
											<p className="text-opacity-80 mb-2 text-xs text-white">
												{task.startTime} - {task.endTime}
											</p>

											{/* Participants */}
											<div className="flex -space-x-1">
												{task.participants
													.slice(0, 3)
													.map((participant, index) => (
														<div
															key={index}
															className="bg-opacity-20 border-opacity-20 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white text-xs"
														>
															{participant.avatar}
														</div>
													))}
												{task.participants.length > 3 && (
													<div className="bg-opacity-20 border-opacity-20 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white text-xs font-medium text-white">
														+{task.participants.length - 3}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>

					{/* Current time indicator */}
					<div className="absolute top-16 left-1/4 h-8 w-0.5 rounded-full bg-red-400">
						<div className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-red-400"></div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="mt-8 flex space-x-3">
					<button className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200">
						Add Task
					</button>
					<button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
						View Calendar
					</button>
					<button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
						Team Schedule
					</button>
				</div>
			</div>
		</div>
	)
}

export default DailyTasksCalendar
