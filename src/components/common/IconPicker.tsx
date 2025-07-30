'use client'

import {
	type ChangeEvent,
	type ComponentPropsWithoutRef,
	type ReactNode,
	memo,
	useCallback,
	useMemo,
	useState
} from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { getIcon } from '@/utils/constants/icons'
import { useIconRegistry } from '@/utils/hooks/icon/useLucideIcons'

interface IconPickerProps {
	value?: string
	onChange: (iconName: string) => void
	placeholder?: string
}

const IconGridItem = memo(
	({ name, onSelect }: { name: string; onSelect: (name: string) => void }) => {
		const handleClick = useCallback(() => onSelect(name), [name, onSelect])

		return (
			<Button
				variant='ghost'
				size='sm'
				className='hover:bg-accent h-12 w-12 p-2'
				onClick={handleClick}
				title={name}
			>
				<IconComponent
					name={name}
					size={20}
				/>
			</Button>
		)
	}
)

IconGridItem.displayName = 'IconGridItem'

const IconGrid = memo(
	({ icons, onSelect }: { icons: { name: string }[]; onSelect: (name: string) => void }) => {
		const visibleIcons = useMemo(() => icons.slice(0, 100), [icons])

		return (
			<div className='grid max-h-[400px] grid-cols-8 gap-2 overflow-y-auto rounded-lg border p-2'>
				{visibleIcons.map(({ name }) => (
					<IconGridItem
						key={name}
						name={name}
						onSelect={onSelect}
					/>
				))}
			</div>
		)
	}
)

IconGrid.displayName = 'IconGrid'

export const IconPicker = ({ value, onChange, placeholder = 'Select icon' }: IconPickerProps) => {
	const [open, setOpen] = useState(false)
	const { search, setSearch, icons } = useIconRegistry()

	const handleSelect = useCallback(
		(iconName: string) => {
			onChange(iconName)
			setOpen(false)
		},
		[onChange]
	)

	const handleClearSearch = useCallback(() => {
		setSearch('')
	}, [setSearch])

	const handleSearchChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value)
		},
		[setSearch]
	)

	const currentIcon = useMemo(() => (value ? getIcon(value) : null), [value])

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='min-w-[150px] gap-2'
				>
					{currentIcon ? (
						<>
							<IconComponent
								name={value!}
								size={16}
							/>
							{value}
						</>
					) : (
						placeholder
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Choose Icon</DialogTitle>
					<DialogDescription>
						Select from {icons.length} available icons
						{icons.length > 100 && ' (showing first 100)'}
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-4'>
					<Input
						placeholder='Search icons...'
						value={search}
						onChange={handleSearchChange}
					/>
					<IconGrid
						icons={icons}
						onSelect={handleSelect}
					/>
					{icons.length === 0 && (
						<div className='text-muted-foreground py-8 text-center'>
							<p>No icons found</p>
							<Button
								variant='ghost'
								size='sm'
								onClick={handleClearSearch}
								className='mt-2'
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

export const IconDisplay = memo(
	({
		iconName,
		size = 24,
		className = ''
	}: {
		iconName?: string
		size?: number
		className?: string
	}) => {
		if (!iconName) return null

		return (
			<div className={`flex items-center justify-center ${className}`}>
				<IconComponent
					name={iconName}
					size={size}
				/>
			</div>
		)
	}
)

IconDisplay.displayName = 'IconDisplay'

export const IconComponent = memo(
	({
		name,
		size = 16,
		fallback = '?',
		className = '',
		...props
	}: {
		name: string
		size?: number
		fallback?: ReactNode
		className?: string
	} & ComponentPropsWithoutRef<'svg'>) => {
		const iconData = useMemo(() => getIcon(name), [name])

		if (!iconData) {
			return (
				<div
					className={`flex items-center justify-center bg-gray-200 text-xs ${className}`}
					style={{ width: size, height: size }}
				>
					{fallback}
				</div>
			)
		}

		const { Component } = iconData
		return (
			<Component
				size={size}
				className={className}
				{...props}
			/>
		)
	}
)

IconComponent.displayName = 'IconComponent'
