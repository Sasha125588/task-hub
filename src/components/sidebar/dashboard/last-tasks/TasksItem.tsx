import { Image as ImageIcon } from "lucide-react"
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

import { ProgressBar } from "./ProgressBar"
import type { ITask as CardType } from "./types"

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
						<h3 className="w-[180px] truncate text-sm font-medium">
							{item.title}
						</h3>
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

			<ProgressBar progress={item.progress.value} />

			<div className="text-muted-foreground flex items-center justify-between text-xs">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1">
						<MessageSquareMore
							animateOnHover
							size={18}
							className="cursor-pointer"
						/>
						<p className="text-accent-foreground cursor-default text-base">
							{item.comments}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<motion.div
							whileHover={{ scale: 1.1 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<ImageIcon size={18} className="cursor-pointer" />
						</motion.div>

						<p className="text-accent-foreground cursor-default text-base">
							{item.attachments}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<SquareArrowOutUpRight
							className="cursor-pointer"
							size={18}
							animateOnHover
						/>
						<p className="text-accent-foreground cursor-default text-base">
							{item.links}
						</p>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="bg-primary dark:bg-accent flex size-9 items-center justify-center rounded-full">
						<PlusIcon
							color="white"
							className="cursor-pointer"
							animateOnHover
							size={24}
						/>
					</div>
					<div className="border-primary/75 flex size-9 items-center justify-center rounded-full border-[1.5px]">
						<BrushIcon
							className="cursor-pointer"
							animateOnHover
							size={19}
							color="var(--primary)"
						/>
					</div>
				</div>
			</div>
		</Card>
	)
}
