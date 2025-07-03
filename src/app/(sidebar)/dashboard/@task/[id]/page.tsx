"use client"

import { usePathname } from "next/navigation"

import { TaskModal } from "@/components/sidebar/dashboard/last-tasks/TaskModal"

export default function TaskDetails() {
	const pathname = usePathname().split("/")
	const pathnameLen = pathname.length
	const id = pathname[pathnameLen - 1]
	return <TaskModal>Task Page. Task id: {id}</TaskModal>
}
