'use client'

import { type HTMLMotionProps, type Transition, type Variant, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/helpers/cn'

type FlipDirection = 'top' | 'bottom' | 'left' | 'right'

type FlipButtonProps = HTMLMotionProps<'button'> & {
	frontText: string
	flipped: boolean
	backText: string
	transition?: Transition
	frontClassName?: string
	backClassName?: string
	from?: FlipDirection
}

const DEFAULT_SPAN_CLASS_NAME = 'absolute inset-0 flex items-center justify-center rounded-lg'

function FlipButton({
	frontText,
	flipped,
	backText,
	transition = { type: 'spring', stiffness: 280, damping: 20 },
	className,
	frontClassName,
	backClassName,
	from = 'top',
	onClick,
	...props
}: FlipButtonProps) {
	const isVertical = from === 'top' || from === 'bottom'
	const rotateAxis = isVertical ? 'rotateX' : 'rotateY'
	const frontOffset = from === 'top' || from === 'left' ? '50%' : '-50%'
	const backOffset = from === 'top' || from === 'left' ? '-50%' : '50%'

	const buildVariant = (
		opacity: number,
		rotation: number,
		offset: string | null = null
	): Variant => ({
		opacity,
		[rotateAxis]: rotation,
		...(isVertical && offset !== null ? { y: offset } : {}),
		...(!isVertical && offset !== null ? { x: offset } : {})
	})

	const frontVariants = {
		initial: buildVariant(1, 0, '0%'),
		hover: buildVariant(0, 90, frontOffset),
		clicked: buildVariant(0, 90, frontOffset)
	}

	const backVariants = {
		initial: buildVariant(0, 90, backOffset),
		hover: buildVariant(1, 0, '0%'),
		clicked: buildVariant(1, 0, '0%')
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
	}

	// Определяем текущее состояние анимации
	const currentState = flipped ? 'clicked' : 'initial'

	return (
		<motion.button
			role='button'
			aria-pressed={flipped}
			data-slot='flip-button'
			initial='initial'
			animate={currentState}
			whileTap={flipped ? 'initial' : 'hover'}
			className={cn(
				'relative inline-block h-10 cursor-pointer px-3 py-2 text-sm font-medium perspective-[1000px] focus:outline-none',
				className
			)}
			onClick={handleClick}
			{...props}
		>
			<motion.span
				data-slot='flip-button-front'
				variants={frontVariants}
				transition={transition}
				className={cn(
					DEFAULT_SPAN_CLASS_NAME,
					'bg-secondary/80 text-black dark:text-white',
					frontClassName
				)}
			>
				{frontText}
			</motion.span>
			<motion.span
				data-slot='flip-button-back'
				variants={backVariants}
				transition={transition}
				className={cn(DEFAULT_SPAN_CLASS_NAME, 'bg-primary text-primary-foreground', backClassName)}
			>
				{backText}
			</motion.span>
			<span className='invisible'>{frontText}</span>
		</motion.button>
	)
}

export { FlipButton, type FlipButtonProps, type FlipDirection }
