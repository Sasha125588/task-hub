'use client'

import { useClickOutside } from '@siberiacancode/reactuse'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useCreateChannelForm } from '../../hooks/useCreateChannelForm'

interface CreateChannelFormProps {
	onClose: () => void
}

export function CreateChannelForm({ onClose }: CreateChannelFormProps) {
	const { form, functions, state } = useCreateChannelForm({ onClose })
	const ref = useClickOutside<HTMLFormElement>(() => onClose())

	return (
		<Form {...form}>
			<form
				ref={ref}
				onSubmit={event => {
					event.preventDefault()
					functions.onSubmit()
				}}
				className='mt-2 space-y-2'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									id='name'
									placeholder='Channel name'
									className='h-8 text-sm'
									disabled={state.loading}
									autoFocus
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-2'>
					<Button
						type='submit'
						size='sm'
						className='h-7 px-2 text-xs'
						disabled={state.loading}
					>
						{state.loading ? 'Creating...' : 'Create'}
					</Button>
					<Button
						type='button'
						size='sm'
						variant='ghost'
						className='h-7 px-2 text-xs'
						onClick={onClose}
						disabled={state.loading}
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	)
}
