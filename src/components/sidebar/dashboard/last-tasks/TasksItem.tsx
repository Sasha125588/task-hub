import { CircleCheck, Image } from "lucide-react"
import { motion } from "motion/react"

import {
	AvatarGroup,
	AvatarGroupTooltip
} from "@/components/animate-ui/components/avatar-group"
import { BrushIcon } from "@/components/animate-ui/icons/brush-icon"
import { MessageSquareMore } from "@/components/animate-ui/icons/message-square-more-icon"
import { PlusIcon } from "@/components/animate-ui/icons/plus-icon"
import { SquareArrowOutUpRight } from "@/components/animate-ui/icons/square-arrow-out-up-right-icon"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

import type { Task as CardType } from "./types"

interface Props {
	item: CardType
}

export function TaskItem({ item }: Props) {
	return (
		<Card className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
						<item.image animateOnHover size={24} />
					</div>
					<div>
						<h3 className="text-sm font-medium">{item.title}</h3>
						<p className="text-muted-foreground text-xs">
							Due: {item.dueInDays} days
						</p>
					</div>
				</div>
				<AvatarGroup className="-space-x-3">
					{item.users.map((user, idx) => (
						<Avatar key={idx} className="border-background size-9 border-1">
							<AvatarImage src={user.src} />
							<AvatarGroupTooltip>
								<p>{user.name}</p>
							</AvatarGroupTooltip>
						</Avatar>
					))}
				</AvatarGroup>
			</div>

			<div
				className={`h-12 w-full rounded-full ${item.progress.color} relative overflow-hidden`}
			>
				<div
					className="absolute h-full bg-white/20"
					style={{ width: `${item.progress.value}%` }}
				/>
				<span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
					{item.progress.status === "completed" ? (
						<div className="flex items-center gap-1">
							<CircleCheck size={16} className="" />
							<p className="text-sm">Done</p>
						</div>
					) : (
						`${item.progress.value}%`
					)}
				</span>
			</div>

			<div className="text-muted-foreground flex items-center justify-between text-xs">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1">
						<MessageSquareMore animateOnHover size={18} />
						<motion.p
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="cursor-pointer text-base text-black dark:text-white"
						>
							{item.comments}
						</motion.p>
					</div>
					<div className="flex items-center gap-1">
						<motion.div
							whileHover={{ scale: 1.1 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<Image size={18} />
						</motion.div>

						<motion.p
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="cursor-pointer text-base text-black dark:text-white"
						>
							{item.attachments}
						</motion.p>
					</div>
					<div className="flex items-center gap-1">
						<SquareArrowOutUpRight size={18} animateOnHover />
						<motion.p
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="cursor-pointer text-base text-black dark:text-white"
						>
							{item.links}
						</motion.p>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="bg-primary/90 flex size-9 items-center justify-center rounded-full">
						<PlusIcon color="white" animateOnHover size={24} />
					</div>
					<div className="border-primary/90 flex size-9 items-center justify-center rounded-full border-[1.5px]">
						<BrushIcon animateOnHover size={19} color="var(--primary)" />
					</div>
				</div>
			</div>
		</Card>
	)
}
