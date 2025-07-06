"use client"

import * as LucideIcons from "lucide-react"
import React, { useMemo, useState } from "react"

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface Icons {
	name: string
	friendly_name: string
	Component: LucideIcon
}

interface UseIconPickerReturn {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	icons: Icons[]
}

const EXCLUDED_EXPORTS = ["createLucideIcon", "default", "Icon"]

export const useIconPicker = (): UseIconPickerReturn => {
	const [search, setSearch] = useState<string>("")

	const icons: Icons[] = useMemo(() => {
		const allExports = Object.entries(LucideIcons)
		const objectExports = allExports.filter(
			([, value]) => typeof value === "object" && value !== null
		)
		const capitalizedObjects = objectExports.filter(([key]) =>
			/^[A-Z]/.test(key)
		)
		const validIcons = capitalizedObjects.filter(
			([key]) => !EXCLUDED_EXPORTS.includes(key) && key.endsWith("Icon")
		)

		const result: Icons[] = []
		validIcons.forEach(([iconName, IconComponent]) => {
			try {
				const friendlyName = iconName.replace(/([A-Z])/g, " $1").trim()
				result.push({
					name: iconName,
					friendly_name: friendlyName,
					Component: IconComponent as LucideIcon
				})
			} catch (error) {
				console.error(`Error processing icon ${iconName}:`, error)
			}
		})
		return result
	}, [])
	const filteredIcons = useMemo(() => {
		if (search === "") {
			return icons.slice(0, 100)
		}
		const searchLower = search.toLowerCase()
		return icons.filter(
			icon =>
				icon.name.toLowerCase().includes(searchLower) ||
				icon.friendly_name.toLowerCase().includes(searchLower)
		)
	}, [icons, search])

	return { search, setSearch, icons: filteredIcons }
}

interface IconRendererProps extends React.ComponentPropsWithoutRef<"svg"> {
	icon: string
}

export const IconRenderer = ({ icon, ...rest }: IconRendererProps) => {
	const IconComponent = (LucideIcons as Record<string, unknown>)[icon] as
		| LucideIcon
		| undefined

	if (!IconComponent) {
		return (
			<div className="flex h-4 w-4 items-center justify-center bg-red-200 text-xs">
				?
			</div>
		)
	}

	if (typeof IconComponent !== "object" || IconComponent === null) {
		return (
			<div className="flex h-4 w-4 items-center justify-center bg-yellow-200 text-xs">
				!
			</div>
		)
	}

	try {
		return React.createElement(IconComponent, rest)
	} catch (error) {
		console.error(`Error rendering icon "${icon}":`, error)
		return (
			<div className="flex h-4 w-4 items-center justify-center bg-red-200 text-xs">
				❌
			</div>
		)
	}
}
