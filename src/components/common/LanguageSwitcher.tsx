import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { setLocale } from '@/utils/helpers/i18n/setLocale'
import { useI18n } from '@/utils/providers'

const languages = [
	{ code: 'en', label: 'EN' },
	{ code: 'ru', label: 'RU' },
	{ code: 'uk', label: 'UA' }
]

export function LanguageSwitcher() {
	const i18n = useI18n()
	const locale = i18n.locale ?? 'en'
	const currentLanguage = languages.find(l => l.code === locale)?.label ?? locale

	const handleChange = (lang: string) => {
		if (lang !== locale) {
			setLocale(lang)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='bg-primary! text-primary-foreground hover:text-primary-foreground! w-10 cursor-pointer'
					variant='outline'
					size='sm'
				>
					{currentLanguage}
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
