import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
	return (
		<form {...props}>
			<div className="relative">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<SidebarInput
					id="search"
					placeholder="Search the docs..."
					className="mr-8 rounded-full py-5 pl-10"
				/>
				<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-50 select-none" />
			</div>
		</form>
	)
}
