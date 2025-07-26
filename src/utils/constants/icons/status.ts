import {
	AlertTriangle,
	Calendar,
	CheckCircle,
	Clock,
	HelpCircle,
	Info,
	Timer,
	XCircle
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const STATUS_ICONS: IconData[] = [
	createIconData('CheckCircle', CheckCircle, 'status'),
	createIconData('XCircle', XCircle, 'status'),
	createIconData('AlertTriangle', AlertTriangle, 'status'),
	createIconData('Info', Info, 'status'),
	createIconData('HelpCircle', HelpCircle, 'status'),
	createIconData('Clock', Clock, 'status'),
	createIconData('Calendar', Calendar, 'status'),
	createIconData('Timer', Timer, 'status')
]
