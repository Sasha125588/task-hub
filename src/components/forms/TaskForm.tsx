"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"

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

import { TASKS } from "../sidebar/dashboard/last-tasks/data"

interface Props {
	id: string
}

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters."
	})
})

export function TaskEditForm({ id }: Props) {
	const task = useMemo(() => {
		return TASKS.find(task => task.id === id)
	}, [id])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: task?.title
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
