import type { LucideIcon } from 'lucide-react'

import type { IconCategory, IconData } from '@/utils/constants/icons/types'
import { createSearchTerms } from '@/utils/helpers/icon/createSearchTerms'

export const createIconData = (
	name: string,
	Component: LucideIcon,
	category: IconCategory
): IconData => ({
	name,
	Component,
	searchTerms: createSearchTerms(name),
	category
})
