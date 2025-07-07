import * as LucideIcons from "lucide-react"
import type { LucideIcon as LucideIconType } from "lucide-react"
import { useMemo, useState } from "react"

const EXCLUDED_EXPORTS = new Set(["createLucideIcon", "default", "Icon"])

export interface Icons {
	name: string
	friendly_name: string
	Component: LucideIconType
}

export const useLucideIcons = () => {
	const [search, setSearch] = useState("")

	const icons = useMemo((): Icons[] => {
		return Object.entries(LucideIcons)
			.filter(
				([key, value]) =>
					typeof value === "object" &&
					value !== null &&
					key[0] === key[0].toUpperCase() &&
					key.endsWith("Icon") &&
					!EXCLUDED_EXPORTS.has(key)
			)
			.map(([name, Component]) => ({
				name,
				friendly_name: name.replace(/([A-Z])/g, " $1").trim(),
				Component: Component as LucideIconType
			}))
	}, [])

	const filteredIcons = useMemo(() => {
		const query = search.trim().toLowerCase()
		if (!query) return icons.slice(0, 100)
		return icons.filter(
			({ name, friendly_name }) =>
				name.toLowerCase().includes(query) ||
				friendly_name.toLowerCase().includes(query)
		)
	}, [icons, search])

	return {
		search,
		setSearch,
		icons: filteredIcons
	}
}
