import { Code, Command, Hammer, Ruler, Scissors, Terminal, Timer, Wrench } from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const TOOL_ICONS: IconData[] = [
	createIconData('Wrench', Wrench, 'tools'),
	createIconData('Hammer', Hammer, 'tools'),
	createIconData('Scissors', Scissors, 'tools'),
	createIconData('Ruler', Ruler, 'tools'),
	createIconData('Timer', Timer, 'tools'),
	createIconData('Terminal', Terminal, 'tools'),
	createIconData('Command', Command, 'tools'),
	createIconData('Code', Code, 'tools')
]
