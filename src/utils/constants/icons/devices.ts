import {
	Battery,
	BatteryLow,
	Database,
	Laptop,
	Monitor,
	Server,
	Signal,
	Smartphone,
	Tablet,
	Wifi,
	WifiOff
} from 'lucide-react'

import { createIconData } from '@/utils/helpers/icon/createIconData'

import { type IconData } from './types'

export const DEVICE_ICONS: IconData[] = [
	createIconData('Monitor', Monitor, 'devices'),
	createIconData('Laptop', Laptop, 'devices'),
	createIconData('Smartphone', Smartphone, 'devices'),
	createIconData('Tablet', Tablet, 'devices'),
	createIconData('Server', Server, 'devices'),
	createIconData('Database', Database, 'devices'),
	createIconData('Wifi', Wifi, 'devices'),
	createIconData('WifiOff', WifiOff, 'devices'),
	createIconData('Battery', Battery, 'devices'),
	createIconData('BatteryLow', BatteryLow, 'devices'),
	createIconData('Signal', Signal, 'devices')
]
