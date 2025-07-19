import { Code, Command, Hammer, Ruler, Scissors, Terminal, Timer, Wrench } from 'lucide-react'

import { type IconData } from './types'
import { createIconData } from '@/lib/helpers/icon/createIconData'

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
