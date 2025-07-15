import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useI18n } from '@/utils/providers'

import { setLocale } from '@/lib/helpers/i18n/setLocale'

const languages = [
	{ code: 'en', label: 'English' },
	{ code: 'ru', label: 'Русский' }
]

export function LanguageSwitcher() {
	const i18n = useI18n()
	const locale = i18n.locale ?? 'en'

	const handleChange = (lang: string) => {
		if (lang !== locale) {
			setLocale(lang)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='w-20'
					variant='outline'
					size='sm'
				>
					{languages.find(l => l.code === locale)?.label ?? locale}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{languages.map(lang => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => handleChange(lang.code)}
						disabled={lang.code === locale}
					>
						{lang.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
