import * as React from 'react'

import { cn } from '@/utils/helpers/cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'dark:dark:bg-accent/50 flex h-9 w-full min-w-0 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-zinc-900 selection:text-zinc-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:bg-zinc-200/30 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 dark:file:text-zinc-50 dark:placeholder:text-zinc-400',
				'focus-visible:ring-ring focus-visible:border-border focus-visible:ring-2 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50',
				'aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
