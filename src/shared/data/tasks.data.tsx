import {
	Bot,
	Camera,
	Coffee,
	Globe,
	Hammer,
	Music,
	Palette,
	Shield,
	Star,
	Zap
} from "lucide-react"

import type { ITask } from "@/types/task.types"

export const TASKS: ITask[] = [
	{
		id: "1",
		icon: Star,
		iconName: "Star",
		title: "E-commerce Mobile App Design",
		dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
		progress: 65,
		status: "in-progress",
		comments: 8,
		attachments: 12,
		links: 3
	},
	{
		id: "2",
		icon: Bot,
		iconName: "Bot",
		title: "AI Chatbot Integration",
		dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
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
		progress: 100,
		status: "completed",
		comments: 15,
		attachments: 4,
		links: 7
	},
	{
		id: "3",
		icon: Hammer,
		iconName: "Hammer",
		title: "Backend API Development",
		dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
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
		progress: 85,
		status: "in-progress",
		comments: 6,
		attachments: 9,
		links: 5
	},
	{
		id: "4",
		icon: Palette,
		iconName: "Palette",
		title: "Brand Identity Redesign",
		dueDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
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
		progress: 0,
		status: "not-started",
		comments: 2,
		attachments: 1,
		links: 0
	},
	{
		id: "5",
		icon: Zap,
		iconName: "Zap",
		title: "Performance Optimization",
		dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
				name: "GR"
			}
		],
		progress: 30,
		status: "in-progress",
		comments: 12,
		attachments: 3,
		links: 8
	},
	{
		id: "6",
		icon: Shield,
		iconName: "Shield",
		title: "Security Audit & Testing",
		dueDate: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000),
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
		progress: 45,
		status: "in-progress",
		comments: 18,
		attachments: 7,
		links: 4
	},
	{
		id: "7",
		icon: Globe,
		iconName: "Globe",
		title: "Multi-language Support",
		dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
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
		progress: 0,
		status: "not-started",
		comments: 0,
		attachments: 2,
		links: 1
	},
	{
		id: "8",
		icon: Camera,
		iconName: "Camera",
		title: "Image Processing Pipeline",
		dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
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
		progress: 100,
		status: "completed",
		comments: 9,
		attachments: 15,
		links: 6
	},
	{
		id: "9",
		icon: Music,
		iconName: "Music",
		title: "Audio Streaming Feature",
		dueDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
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
		progress: 20,
		status: "in-progress",
		comments: 5,
		attachments: 8,
		links: 3
	},
	{
		id: "10",
		icon: Coffee,
		iconName: "Coffee",
		title: "User Onboarding Experience",
		dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
		users: [
			{
				src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
				name: "AW"
			}
		],
		progress: 75,
		status: "in-progress",
		comments: 11,
		attachments: 5,
		links: 2
	}
]
