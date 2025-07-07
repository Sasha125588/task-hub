"use client"

import type { LucideIcon as LucideIconImported } from "lucide-react"
import * as LucideIcons from "lucide-react"
import React, { useState } from "react"

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

import { useLucideIcons } from "@/hooks/useLucideIcons"

interface LucideIconProps extends React.ComponentPropsWithoutRef<"svg"> {
	name: string
	size?: number
	fallback?: React.ReactNode
}

export const LucideIcon = ({
	name,
	size = 16,
	fallback = "?",
	className = "",
	...props
}: LucideIconProps) => {
	const IconComponent = (LucideIcons as Record<string, unknown>)[name] as
		| LucideIconImported
		| undefined

	if (!IconComponent) {
		return (
			<div
				className={`flex items-center justify-center bg-gray-200 text-xs ${className}`}
				style={{ width: size, height: size }}
			>
				{fallback}
			</div>
		)
	}

	return <IconComponent size={size} className={className} {...props} />
}

interface IconPickerProps {
	value?: string
	onChange: (iconName: string) => void
	placeholder?: string
}

export const IconPicker = ({
	value,
	onChange,
	placeholder = "Select icon"
}: IconPickerProps) => {
	const [open, setOpen] = useState(false)
	const { search, setSearch, icons } = useLucideIcons()

	const handleSelect = (iconName: string) => {
		onChange(iconName)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="min-w-[150px] gap-2">
					{value ? (
						<>
							<LucideIcon name={value} size={16} />
							{value}
						</>
					) : (
						placeholder
					)}
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Choose Icon</DialogTitle>
					<DialogDescription>
						Select from {icons.length} available icons
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						placeholder="Search icons..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>

					<div className="grid max-h-[400px] grid-cols-8 gap-2 overflow-y-auto rounded-lg border p-2">
						{icons.map(({ name }) => (
							<Button
								key={name}
								variant="ghost"
								size="sm"
								className="hover:bg-accent h-12 w-12 p-2"
								onClick={() => handleSelect(name)}
								title={name}
							>
								<LucideIcon name={name} size={20} />
							</Button>
						))}
					</div>

					{icons.length === 0 && (
						<div className="text-muted-foreground py-8 text-center">
							<p>No icons found</p>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSearch("")}
								className="mt-2"
							>
								Clear search
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

interface IconDisplayProps {
	iconName?: string
	size?: number
	className?: string
}

export const IconDisplay = ({
	iconName,
	size = 24,
	className = ""
}: IconDisplayProps) => {
	if (!iconName) return null

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<LucideIcon name={iconName} size={size} />
		</div>
	)
}
