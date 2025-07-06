"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { IconRenderer, useIconPicker } from "../ui/icon-picker"

interface Props {
	icon?: string
	onChange: (icon: string) => void
}

export const IconPickerDialog = ({ icon, onChange }: Props) => {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState<string | undefined>(icon)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="min-w-[150px] gap-2">
					{selected ? (
						<>
							<IconRenderer icon={selected} className="h-4 w-4" />
							Update
						</>
					) : (
						"Select"
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Select an Icon</DialogTitle>
					<DialogDescription>Choose the best suited icon</DialogDescription>
				</DialogHeader>
				<IconPicker
					onChange={icon => {
						setSelected(icon)
						setOpen(false)
						onChange?.(icon)
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}

export const IconPicker = ({
	onChange
}: {
	onChange: (icon: string) => void
}) => {
	const { search, setSearch, icons } = useIconPicker()

	return (
		<div className="relative">
			<Input
				placeholder="Search icons..."
				type="search"
				value={search}
				onChange={e => setSearch(e.target.value)}
				className="mb-4"
			/>
			<div className="grid max-h-[400px] grid-cols-8 gap-2 overflow-y-auto p-2">
				{icons.map(({ name }) => (
					<Button
						key={name}
						type="button"
						onClick={() => onChange(name)}
						className="h-12 w-12 border border-gray-200 p-2 hover:bg-gray-100"
						variant="ghost"
						title={name}
					>
						<IconRenderer icon={name} className="h-5 w-5" />
					</Button>
				))}
				{icons.length === 0 && (
					<div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center">
						<p className="text-gray-500">No icons found...</p>
						<Button onClick={() => setSearch("")} variant="ghost" size="sm">
							Clear search
						</Button>
					</div>
				)}
			</div>
			{icons.length > 0 && (
				<div className="mt-2 text-center text-sm text-gray-500">
					Displayed {icons.length} icon{icons.length !== 1 ? "s" : ""}
				</div>
			)}
		</div>
	)
}
