import {
	Bold,
	Brush,
	Eraser,
	Italic,
	Paintbrush,
	Palette,
	PenTool,
	Pencil,
	Type,
	Underline
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const DESIGN_ICONS: IconData[] = [
	createIconData('Paintbrush', Paintbrush, 'design'),
	createIconData('Palette', Palette, 'design'),
	createIconData('Brush', Brush, 'design'),
	createIconData('Eraser', Eraser, 'design'),
	createIconData('Pencil', Pencil, 'design'),
	createIconData('PenTool', PenTool, 'design'),
	createIconData('Type', Type, 'design'),
	createIconData('Bold', Bold, 'design'),
	createIconData('Italic', Italic, 'design'),
	createIconData('Underline', Underline, 'design')
]
