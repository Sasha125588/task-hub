import {
	Bird,
	Bug,
	Cloud,
	CloudRain,
	Droplets,
	Fish,
	Flame,
	Flower,
	Leaf,
	Moon,
	Sun,
	Thermometer,
	TreePine,
	Umbrella,
	Wind,
	Zap
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const NATURE_ICONS: IconData[] = [
	createIconData('Sun', Sun, 'nature'),
	createIconData('Moon', Moon, 'nature'),
	createIconData('Cloud', Cloud, 'nature'),
	createIconData('CloudRain', CloudRain, 'nature'),
	createIconData('Zap', Zap, 'nature'),
	createIconData('Flame', Flame, 'nature'),
	createIconData('Droplets', Droplets, 'nature'),
	createIconData('Wind', Wind, 'nature'),
	createIconData('Thermometer', Thermometer, 'nature'),
	createIconData('Umbrella', Umbrella, 'nature'),
	createIconData('TreePine', TreePine, 'nature'),
	createIconData('Flower', Flower, 'nature'),
	createIconData('Leaf', Leaf, 'nature'),
	createIconData('Bug', Bug, 'nature'),
	createIconData('Fish', Fish, 'nature'),
	createIconData('Bird', Bird, 'nature')
]
