"use client"

import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { type Swapy, createSwapy } from "swapy"

import { CardItem } from "./CardItem"
import { STATISTICS_CARDS } from "@/shared/data/dashboard-statistics.data"

export function Cards() {
	const swapyRef = useRef<Swapy | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			swapyRef.current = createSwapy(containerRef.current, {
				// animation: 'dynamic'
				// swapMode: 'drop',
				// autoScrollOnDrag: true,
				// enabled: true,
				// dragAxis: 'x',
				// dragOnHold: true
			})

			// swapyRef.current.enable(false)
			// swapyRef.current.destroy()
			// console.log(swapyRef.current.slotItemMap())

			swapyRef.current.onBeforeSwap(event => {
				console.log("beforeSwap", event)
				// This is for dynamically enabling and disabling swapping.
				// Return true to allow swapping, and return false to prevent swapping.
				return true
			})

			swapyRef.current.onSwapStart(event => {
				console.log("start", event)
			})
			swapyRef.current.onSwap(event => {
				console.log("swap", event)
			})
			swapyRef.current.onSwapEnd(event => {
				console.log("end", event)
			})
		}
		return () => {
			swapyRef.current?.destroy()
		}
	}, [])

	return (
		<div ref={containerRef} className="flex h-full flex-col gap-5">
			{STATISTICS_CARDS.map(item => (
				<div data-swapy-slot={item.title} key={item.title} className="flex-1">
					<div className="h-full" data-swapy-item={item.desc} key={item.desc}>
						<motion.div className="h-full" whileTap={{ scale: 0.95 }}>
							<CardItem item={item} />
						</motion.div>
					</div>
				</div>
			))}
		</div>
	)
}
