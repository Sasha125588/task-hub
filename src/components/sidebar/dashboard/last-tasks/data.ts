import { Bot } from "@/components/animate-ui/icons/bot-icon"
import { Hammer } from "@/components/animate-ui/icons/hammer-icon"
import { Star } from "@/components/animate-ui/icons/star"

import type { Task } from "./types"

export const Tasks: Task[] = [
	{
		id: "1",
		image: Star,
		title: "Travel App User Flow1",
		dueInDays: 5,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
				name: "SK"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			}
		],
		progress: {
			value: 52,
			status: "in-progress",
			color: "bg-violet-500"
		},
		comments: 3,
		attachments: 6,
		links: 2
	},
	{
		id: "2",
		image: Bot,
		title: "Travel App User Flow2",
		dueInDays: 1,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			}
		],
		progress: {
			value: 100,
			status: "completed",
			color: "bg-teal-500"
		},
		comments: 3,
		attachments: 6,
		links: 2
	},
	{
		id: "3",
		image: Hammer,
		title: "Travel App User Flow3",
		dueInDays: 3,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			}
		],
		progress: {
			value: 80,
			status: "in-progress",
			color: "bg-yellow-500"
		},
		comments: 3,
		attachments: 6,
		links: 2
	},
	{
		id: "4",
		image: Hammer,
		title: "Travel App User Flow3",
		dueInDays: 3,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			}
		],
		progress: {
			value: 0,
			status: "not-started",
			color: "bg-red-400"
		},
		comments: 3,
		attachments: 6,
		links: 2
	}
]
