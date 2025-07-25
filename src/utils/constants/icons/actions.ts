import {
	Archive,
	Bell,
	Bookmark,
	CheckCircle,
	Copy,
	Download,
	Edit,
	Eye,
	EyeOff,
	Filter,
	Lock,
	Minus,
	MoreHorizontal,
	MoreVertical,
	Paperclip,
	Pause,
	Play,
	Plus,
	Printer,
	QrCode,
	RefreshCw,
	RotateCcw,
	Save,
	Scan,
	Send,
	Settings,
	Share,
	Shield,
	SkipBack,
	SkipForward,
	SortAsc,
	SortDesc,
	Trash2,
	Unlock,
	Upload,
	X,
	XCircle
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const ACTION_ICONS: IconData[] = [
	createIconData('Plus', Plus, 'actions'),
	createIconData('Minus', Minus, 'actions'),
	createIconData('Edit', Edit, 'actions'),
	createIconData('Save', Save, 'actions'),
	createIconData('Trash2', Trash2, 'actions'),
	createIconData('Download', Download, 'actions'),
	createIconData('Upload', Upload, 'actions'),
	createIconData('Share', Share, 'actions'),
	createIconData('Copy', Copy, 'actions'),
	createIconData('Eye', Eye, 'actions'),
	createIconData('EyeOff', EyeOff, 'actions'),
	createIconData('Lock', Lock, 'actions'),
	createIconData('Unlock', Unlock, 'actions'),
	createIconData('Shield', Shield, 'actions'),
	createIconData('CheckCircle', CheckCircle, 'actions'),
	createIconData('XCircle', XCircle, 'actions'),
	createIconData('X', X, 'actions'),
	createIconData('RefreshCw', RefreshCw, 'actions'),
	createIconData('RotateCcw', RotateCcw, 'actions'),
	createIconData('Play', Play, 'actions'),
	createIconData('Pause', Pause, 'actions'),
	createIconData('SkipBack', SkipBack, 'actions'),
	createIconData('SkipForward', SkipForward, 'actions'),
	createIconData('Filter', Filter, 'actions'),
	createIconData('SortAsc', SortAsc, 'actions'),
	createIconData('SortDesc', SortDesc, 'actions'),
	createIconData('MoreHorizontal', MoreHorizontal, 'actions'),
	createIconData('MoreVertical', MoreVertical, 'actions'),
	createIconData('Settings', Settings, 'actions'),
	createIconData('Bell', Bell, 'actions'),
	createIconData('Bookmark', Bookmark, 'actions'),
	createIconData('Archive', Archive, 'actions'),
	createIconData('Send', Send, 'actions'),
	createIconData('Scan', Scan, 'actions'),
	createIconData('QrCode', QrCode, 'actions'),
	createIconData('Printer', Printer, 'actions'),
	createIconData('Paperclip', Paperclip, 'actions')
]
