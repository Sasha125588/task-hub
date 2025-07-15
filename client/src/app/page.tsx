import { useI18n } from '@/utils/providers/i18n/useI18n'

export default function Home() {
	const i18n = useI18n()
	return (
		<div>
			{i18n.formatMessage({
				id: 'site.home',
				defaultMessage: 'Welcome to Task Hub!'
			})}
		</div>
	)
}
