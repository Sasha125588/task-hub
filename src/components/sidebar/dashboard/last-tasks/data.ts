import {
	Camera,
	Coffee,
	Globe,
	Music,
	Palette,
	Shield,
	Zap
} from "lucide-react"

import { Bot } from "@/components/animate-ui/icons/bot-icon"
import { Hammer } from "@/components/animate-ui/icons/hammer-icon"
import { Star } from "@/components/animate-ui/icons/star"

import type { Task } from "./types"

export const Tasks: Task[] = [
	{
		id: "1",
		image: Star,
		title: "E-commerce Mobile App Design",
		dueInDays: 7,
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
			value: 65,
			status: "in-progress",
			color: "bg-blue-500"
		},
		comments: 8,
		attachments: 12,
		links: 3
	},
	{
		id: "2",
		image: Bot,
		title: "AI Chatbot Integration",
		dueInDays: 2,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			}
		],
		progress: {
			value: 100,
			status: "completed",
			color: "bg-emerald-500"
		},
		comments: 15,
		attachments: 4,
		links: 7
	},
	{
		id: "3",
		image: Hammer,
		title: "Backend API Development",
		dueInDays: 4,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
				name: "SK"
			}
		],
		progress: {
			value: 85,
			status: "in-progress",
			color: "bg-amber-500"
		},
		comments: 6,
		attachments: 9,
		links: 5
	},
	{
		id: "4",
		image: Palette,
		title: "Brand Identity Redesign",
		dueInDays: 10,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			}
		],
		progress: {
			value: 0,
			status: "not-started",
			color: "bg-gray-400"
		},
		comments: 2,
		attachments: 1,
		links: 0
	},
	{
		id: "5",
		image: Zap,
		title: "Performance Optimization",
		dueInDays: 1,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			}
		],
		progress: {
			value: 30,
			status: "in-progress",
			color: "bg-rose-500"
		},
		comments: 12,
		attachments: 3,
		links: 8
	},
	{
		id: "6",
		image: Shield,
		title: "Security Audit & Testing",
		dueInDays: 6,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
				name: "SK"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			}
		],
		progress: {
			value: 45,
			status: "in-progress",
			color: "bg-purple-500"
		},
		comments: 18,
		attachments: 7,
		links: 4
	},
	{
		id: "7",
		image: Globe,
		title: "Multi-language Support",
		dueInDays: 14,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			}
		],
		progress: {
			value: 0,
			status: "not-started",
			color: "bg-gray-400"
		},
		comments: 0,
		attachments: 2,
		links: 1
	},
	{
		id: "8",
		image: Camera,
		title: "Image Processing Pipeline",
		dueInDays: 8,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
				name: "JH"
			}
		],
		progress: {
			value: 100,
			status: "completed",
			color: "bg-emerald-500"
		},
		comments: 9,
		attachments: 15,
		links: 6
	},
	{
		id: "9",
		image: Music,
		title: "Audio Streaming Feature",
		dueInDays: 12,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
				name: "SK"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			},
			{
				src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
				name: "CN"
			}
		],
		progress: {
			value: 20,
			status: "in-progress",
			color: "bg-indigo-500"
		},
		comments: 5,
		attachments: 8,
		links: 3
	},
	{
		id: "10",
		image: Coffee,
		title: "User Onboarding Experience",
		dueInDays: 3,
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			}
		],
		progress: {
			value: 75,
			status: "in-progress",
			color: "bg-orange-500"
		},
		comments: 11,
		attachments: 5,
		links: 2
	}
]
