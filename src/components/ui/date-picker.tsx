"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"

import { Button } from "./button"

export function DatePickerDemo() {
	const [date, setDate] = React.useState<Date>()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={setDate} />
			</PopoverContent>
		</Popover>
	)
}
