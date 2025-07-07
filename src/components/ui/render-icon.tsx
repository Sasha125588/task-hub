import type { LucideIcon } from "lucide-react"
import React from "react"

interface IconRendererProps extends React.ComponentPropsWithoutRef<"svg"> {
	icon: string
}

const isLucideIcon = (component: unknown): component is LucideIcon => {
	return typeof component === "function"
}

export const IconRenderer = ({ icon, ...rest }: IconRendererProps) => {
	const [IconComponent, setIconComponent] = React.useState<LucideIcon | null>(
		null
	)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	React.useEffect(() => {
		const loadIcon = async () => {
			try {
				setLoading(true)
				setError(false)

				const iconModule = await import("lucide-react")

				// Проверяем, что модуль имеет свойство с нужным именем
				if (!(icon in iconModule)) {
					setError(true)
					return
				}

				const component = (iconModule as Record<string, unknown>)[icon]

				if (isLucideIcon(component)) {
					setIconComponent(component)
				} else {
					setError(true)
				}
			} catch (err) {
				console.error(`Failed to load icon "${icon}":`, err)
				setError(true)
			} finally {
				setLoading(false)
			}
		}

		loadIcon()
	}, [icon])

	if (loading) {
		return (
			<div className="flex h-4 w-4 items-center justify-center bg-gray-200 text-xs">
				⏳
			</div>
		)
	}

	if (error || !IconComponent) {
		return (
			<div className="flex h-4 w-4 items-center justify-center bg-red-200 text-xs">
				?
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
