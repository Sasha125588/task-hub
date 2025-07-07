import { useMemo, useState } from "react"

import { searchIcons } from "@/constants"

export const useIconRegistry = () => {
	const [search, setSearch] = useState("")

	const filteredIcons = useMemo(() => searchIcons(search), [search])

	return {
		search,
		setSearch,
		icons: filteredIcons
	}
}
