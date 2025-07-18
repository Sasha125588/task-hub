'use client'

import { format, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function formatDate(date: Date | undefined) {
	if (!date) {
		return ''
	}

	return format(date, 'PP')
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false
	}
	return !isNaN(date.getTime())
}

interface Props {
	dateForm: Date
	onChangeForm: (date: Date | undefined) => void
}

export function DatePicker({ dateForm: dateP, onChangeForm: onChange }: Props) {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date | undefined>(dateP)
	const [value, setValue] = React.useState(formatDate(date))

	// Обновляем внутреннее состояние при изменении dateForm
	React.useEffect(() => {
		setDate(dateP)
		setValue(formatDate(dateP))
	}, [dateP])

	return (
		<div className='flex flex-col gap-3'>
			<div className='relative flex gap-2'>
				<Input
					id='date'
					value={value}
					placeholder='June 01, 2025'
					className='bg-background pr-10'
					onChange={e => {
						const date = parse(e.target.value, 'PP', new Date())
						setValue(e.target.value)
						if (isValidDate(date)) {
							setDate(date)
							onChange?.(date)
						}
					}}
					onKeyDown={e => {
						if (e.key === 'ArrowDown') {
							e.preventDefault()
							setOpen(true)
						}
					}}
				/>
				<Popover
					open={open}
					onOpenChange={setOpen}
				>
					<PopoverTrigger asChild>
						<Button
							id='date-picker'
							variant='ghost'
							className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
						>
							<CalendarIcon className='size-3.5' />
							<span className='sr-only'>Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto overflow-hidden p-0'
						align='end'
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode='single'
							selected={date}
							captionLayout='dropdown'
							onSelect={date => {
								setDate(date)
								setValue(formatDate(date))
								setOpen(false)
								onChange?.(date)
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
