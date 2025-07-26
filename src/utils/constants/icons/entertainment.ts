import {
	Award,
	Cake,
	Coffee,
	Gift,
	Heart,
	Lightbulb,
	Medal,
	Music,
	PartyPopper,
	Pizza,
	Star,
	Trophy
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const ENTERTAINMENT_ICONS: IconData[] = [
	createIconData('Lightbulb', Lightbulb, 'entertainment'),
	createIconData('Award', Award, 'entertainment'),
	createIconData('Trophy', Trophy, 'entertainment'),
	createIconData('Medal', Medal, 'entertainment'),
	createIconData('Gift', Gift, 'entertainment'),
	createIconData('PartyPopper', PartyPopper, 'entertainment'),
	createIconData('Cake', Cake, 'entertainment'),
	createIconData('Coffee', Coffee, 'entertainment'),
	createIconData('Pizza', Pizza, 'entertainment'),
	createIconData('Star', Star, 'entertainment'),
	createIconData('Heart', Heart, 'entertainment'),
	createIconData('Music', Music, 'entertainment')
]
