import { Search } from 'lucide-react'

import { SidebarInput } from '@/components/animate-ui/radix/sidebar'
import { Label } from '@/components/ui/label'

import { useI18n } from '@/utils/providers'

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
	const i18n = useI18n()
	return (
		<form {...props}>
			<div className='relative'>
				<Label
					htmlFor='search'
					className='sr-only'
				>
					{i18n.formatMessage({ id: 'search.label' })}
				</Label>
				<SidebarInput
					id='search'
					placeholder={i18n.formatMessage({ id: 'search.placeholder' })}
					className='mr-8 py-5 pl-10'
				/>
				<Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-50 select-none' />
			</div>
		</form>
	)
}
