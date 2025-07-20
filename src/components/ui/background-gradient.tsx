'use client'

import { type HTMLMotionProps, type Transition, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/helpers/cn'

type GradientBackgroundProps = HTMLMotionProps<'div'> & {
	transition?: Transition
	color?: 'dark' | 'light'
}

function GradientBackground({
	className,
	transition = { duration: 15, ease: 'easeInOut', repeat: Infinity },
	color = 'dark',
	...props
}: GradientBackgroundProps) {
	return (
		<motion.div
			data-slot='gradient-background'
			className={cn(
				'size-full bg-gradient-to-br bg-[length:400%_400%]',
				className,
				color === 'dark'
					? 'from-violet-800 via-fuchsia-800 to-indigo-800'
					: 'from-blue-400 via-purple-400 to-pink-400'
			)}
			animate={{
				backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
			}}
			transition={transition}
			{...props}
		/>
	)
}

export { GradientBackground, type GradientBackgroundProps }
