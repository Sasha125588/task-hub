'use client'

import { type HTMLMotionProps, motion, useScroll, useSpring } from 'motion/react'
import * as React from 'react'

import { cn } from '@/utils/helpers/cn'

type ScrollProgressProps = React.ComponentProps<'div'> & {
	progressProps?: HTMLMotionProps<'div'>
}

function ScrollProgress({
	ref,
	className,
	children,
	progressProps,
	...props
}: ScrollProgressProps) {
	const containerRef = React.useRef<HTMLDivElement | null>(null)
	React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

	const { scrollYProgress } = useScroll(children ? { container: containerRef } : undefined)

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 250,
		damping: 40,
		bounce: 0
	})

	return (
		<>
			<motion.div
				data-slot='scroll-progress'
				{...progressProps}
				style={{ scaleX }}
				className={cn(
					'bg-primary fixed inset-x-0 top-0 z-50 h-1 origin-left',
					progressProps?.className
				)}
			/>
			{containerRef && (
				<div
					ref={containerRef}
					data-slot='scroll-progress-container'
					className={cn('h-full overflow-y-auto', className)}
					{...props}
				>
					{children}
				</div>
			)}
		</>
	)
}

export { ScrollProgress, type ScrollProgressProps }
