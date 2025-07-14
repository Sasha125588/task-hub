import { Bike, Bus, Car, Fuel, Plane, Train, Truck } from 'lucide-react'

import { type IconData } from './types'
import { createIconData } from '@/lib/helpers/icon'

export const TRANSPORTATION_ICONS: IconData[] = [
	createIconData('Car', Car, 'transportation'),
	createIconData('Bus', Bus, 'transportation'),
	createIconData('Train', Train, 'transportation'),
	createIconData('Plane', Plane, 'transportation'),
	createIconData('Bike', Bike, 'transportation'),
	createIconData('Truck', Truck, 'transportation'),
	createIconData('Fuel', Fuel, 'transportation')
]
