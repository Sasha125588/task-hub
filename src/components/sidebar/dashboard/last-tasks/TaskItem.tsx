import { useUnit } from "effector-react"
import { Image as ImageIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import {
	AvatarGroup,
	AvatarGroupTooltip
} from "@/components/animate-ui/components/avatar-group"
import { BrushIcon } from "@/components/animate-ui/icons/brush-icon"
import { MessageSquareMore } from "@/components/animate-ui/icons/message-square-more-icon"
import { PlusIcon } from "@/components/animate-ui/icons/plus-icon"
import { SquareArrowOutUpRight } from "@/components/animate-ui/icons/square-arrow-out-up-right-icon"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { IconRenderer } from "@/components/ui/render-icon"

import { ProgressBar } from "./ProgressBar"
import type { ITask } from "./types"
import { TASK_CONFIG } from "@/configs/task.config"
import { getDaysUntilDue } from "@/lib/utils/getDaysUntilDue"
import { taskDeleted } from "@/stores/task/store"

interface Props {
	item: ITask
}
const EDIT_TASK_URL = TASK_CONFIG.EDIT_TASK_URL

export function TaskItem({ item }: Props) {
	const deleteTask = useUnit(taskDeleted)
	const dueDate = getDaysUntilDue(item.dueDate)

	return (
		<Card className="relative overflow-visible">
			<GlowingEffect
				spread={40}
				glow={true}
				disabled={false}
				proximity={64}
				inactiveZone={0.01}
			/>
			<CardContent className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex min-w-0 items-center gap-2">
						<div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg shadow-md">
							<IconRenderer className="size-6" icon={item.iconName} />
						</div>
						<div className="@container w-[250px]">
							<h3 className="truncate text-sm font-medium @[400px]:whitespace-normal @[600px]:truncate">
								{item.title}
							</h3>
							<p className="text-muted-foreground text-xs">
								Due: {dueDate} days
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

				<ProgressBar progress={item.progress} />

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
						<div
							onClick={() => deleteTask(item.id)}
							className="bg-primary dark:bg-chart-3 flex size-9 items-center justify-center rounded-full"
						>
							<PlusIcon
								color="white"
								className="cursor-pointer"
								animateOnHover
								size={24}
							/>
						</div>
						<div className="border-primary/75 flex size-9 items-center justify-center rounded-full border-[1.5px]">
							<Link href={EDIT_TASK_URL(item.id)}>
								<BrushIcon
									className="cursor-pointer"
									animateOnHover
									size={19}
									color="var(--primary)"
								/>
							</Link>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
