import { useUnit } from "effector-react"

import { FlipButton } from "@/components/animate-ui/buttons/flip"
import { TabsList, TabsTrigger } from "@/components/animate-ui/radix/tabs"

import { TASK_CONFIG } from "@/configs/task.config"
import { TABS } from "@/shared/data/task-list.data"
import {
	$numTasksByStatus,
	$sortType,
	$statusType,
	sortTypeUpdated
} from "@/stores/task/store"

const FRONT_TEXT = TASK_CONFIG.FLIP_BUTTON_CONFIG.frontText
const BACK_TEXT = TASK_CONFIG.FLIP_BUTTON_CONFIG.backText

export function TaskListHeader() {
	const updateSortType = useUnit(sortTypeUpdated)
	const statusType = useUnit($statusType)

	const sortType = useUnit($sortType)

	const numOfTasksByStatus = useUnit($numTasksByStatus)

	const changeSortType = () => {
		const newSortType = sortType === "asc" ? "desc" : "asc"
		updateSortType(newSortType)
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<TabsList dir="ltr">
					{TABS.map(tab => {
						return (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.title}
							</TabsTrigger>
						)
					})}
				</TabsList>
				<FlipButton
					frontText={FRONT_TEXT}
					backText={BACK_TEXT}
					flipped={sortType == "asc"}
					onClick={changeSortType}
					className="rounded-lg shadow"
				/>
			</div>
			<h4 className="font-geist-sans scroll-m-20 text-xl font-semibold tracking-tight">
				Last Tasks{" "}
				<span className="text-accent-foreground/60">
					{numOfTasksByStatus[statusType]}
				</span>
			</h4>
		</div>
	)
}
