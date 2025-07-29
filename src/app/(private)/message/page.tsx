import { I18nText } from '@/components/common/I18nText/I18nText'

export default function MessagesPage() {
	return (
		<div className='flex h-full items-center justify-center'>
			<div className='text-center'>
				<h2 className='mb-2 text-lg font-semibold'>
					<I18nText path='chat.greeting' />
				</h2>
				<p className='text-muted-foreground'>
					<I18nText path='chat.description' />
				</p>
			</div>
		</div>
	)
}
