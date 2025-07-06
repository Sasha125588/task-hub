"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useUnit } from "effector-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { DatePicker } from "../shared/DatePicker"
import { IconPickerDialog } from "../shared/IconPicker"

import { $getTaskByID, taskUpdated } from "@/stores/task/store"

interface Props {
	id: string
}

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters."
	}),
	dueDate: z
		.date({
			required_error: "Due date is required.",
			invalid_type_error: "Please select a valid date."
		})
		.refine(date => date > new Date(), {
			message: "Due date must be in the future."
		}),
	icon: z.any()
})

export function TaskEditForm({ id }: Props) {
	const router = useRouter()
	const updateTask = useUnit(taskUpdated)
	const getTaskByID = useUnit($getTaskByID)
	const task = getTaskByID(id)!

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: task.title,
			dueDate: task.dueDate,
			icon: task.imageName
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		updateTask({ id, ...values })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormDescription>
								<Link href="/dashboard">Task Page. Task id: {id}</Link>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Due Date</FormLabel>
							<FormControl>
								<DatePicker dateP={field.value} onChange={field.onChange} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="icon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Icon</FormLabel>
							<FormControl>
								<IconPickerDialog
									icon={field.value}
									onChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="cursor-pointer"
					onClick={() => {
						toast("Task updated successfully", {
							description: `${format(new Date(), "Pp")}`
						})
						router.back()
					}}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Form>
	)
}
