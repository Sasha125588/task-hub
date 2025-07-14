import {
	Activity,
	BarChart,
	Calculator,
	CreditCard,
	DollarSign,
	LineChart,
	Package,
	Percent,
	PieChart,
	ShoppingBag,
	ShoppingCart,
	Target,
	TrendingDown,
	TrendingUp,
	Wallet
} from 'lucide-react'

import { type IconData } from './types'
import { createIconData } from '@/lib/helpers/icon'

export const BUSINESS_ICONS: IconData[] = [
	createIconData('CreditCard', CreditCard, 'business'),
	createIconData('Wallet', Wallet, 'business'),
	createIconData('DollarSign', DollarSign, 'business'),
	createIconData('ShoppingCart', ShoppingCart, 'business'),
	createIconData('ShoppingBag', ShoppingBag, 'business'),
	createIconData('Package', Package, 'business'),
	createIconData('BarChart', BarChart, 'business'),
	createIconData('LineChart', LineChart, 'business'),
	createIconData('PieChart', PieChart, 'business'),
	createIconData('Calculator', Calculator, 'business'),
	createIconData('Percent', Percent, 'business'),
	createIconData('Activity', Activity, 'business'),
	createIconData('TrendingUp', TrendingUp, 'business'),
	createIconData('TrendingDown', TrendingDown, 'business'),
	createIconData('Target', Target, 'business')
]
