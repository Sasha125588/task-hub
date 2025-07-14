import {
	Archive,
	Bookmark,
	File,
	FileText,
	Files,
	Folder,
	FolderOpen,
	Tag
} from 'lucide-react'

import { type IconData } from './types'
import { createIconData } from '@/lib/helpers/icon'

export const FILE_ICONS: IconData[] = [
	createIconData('File', File, 'files'),
	createIconData('FileText', FileText, 'files'),
	createIconData('Files', Files, 'files'),
	createIconData('Folder', Folder, 'files'),
	createIconData('FolderOpen', FolderOpen, 'files'),
	createIconData('Archive', Archive, 'files'),
	createIconData('Bookmark', Bookmark, 'files'),
	createIconData('Tag', Tag, 'files')
]
