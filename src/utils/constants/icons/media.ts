import {
	Camera,
	Image,
	Mic,
	MicOff,
	Music,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	Video,
	Volume2,
	VolumeX
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const MEDIA_ICONS: IconData[] = [
	createIconData('Camera', Camera, 'media'),
	createIconData('Image', Image, 'media'),
	createIconData('Video', Video, 'media'),
	createIconData('Music', Music, 'media'),
	createIconData('Mic', Mic, 'media'),
	createIconData('MicOff', MicOff, 'media'),
	createIconData('Volume2', Volume2, 'media'),
	createIconData('VolumeX', VolumeX, 'media'),
	createIconData('Play', Play, 'media'),
	createIconData('Pause', Pause, 'media'),
	createIconData('SkipBack', SkipBack, 'media'),
	createIconData('SkipForward', SkipForward, 'media')
]
