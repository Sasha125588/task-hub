import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getDaysUntilDue = (dueDate: Date) => {
	if (!dueDate) return "No due date"

	const now = new Date()
	const due = new Date(dueDate)
	const diffTime = due.getTime() - now.getTime()
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	return diffDays
}
