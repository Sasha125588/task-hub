'use client'

import { Hash, Plus, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'
import { type FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { createChannel } from '@/utils/api/requests/chat/channels/createChannel'
import { deleteChannel } from '@/utils/api/requests/chat/channels/deleteChannel'
import { useChatStore } from '@/utils/hooks/useChatStore'
import { useChatUser } from '@/utils/hooks/useChatUser'

import { cn } from '@/lib/helpers/cn'

export function ChannelsSidebar() {
	const pathname = usePathname()
	const router = useRouter()
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [newChannelName, setNewChannelName] = useState('')
	const [isCreating, setIsCreating] = useState(false)

	const { userId } = useChatUser()
	const { channels } = useChatStore()

	const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsCreating(true)

		try {
			const newChannel = await createChannel(newChannelName, userId!)

			if (newChannel && newChannel[0]) {
				router.push(`/message/${newChannel[0].id}`)
			}

			setShowCreateForm(false)
			setNewChannelName('')
		} catch (error) {
			console.error('Failed to create channel:', error)
		} finally {
			setIsCreating(false)
		}
	}

	const handleDeleteChannel = async (channelId: number) => {
		try {
			await deleteChannel(channelId)
		} catch (error) {
			console.error('Failed to delete channel:', error)
		}
	}

	return (
		<div className='bg-muted/30 flex h-full flex-col rounded-bl-lg p-4'>
			<div className='mb-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Channels</h2>
					<Button
						size='sm'
						variant='ghost'
						onClick={() => setShowCreateForm(true)}
						className='h-8 w-8 p-0'
					>
						<Plus className='h-4 w-4' />
					</Button>
				</div>

				{showCreateForm && (
					<form
						onSubmit={handleCreateChannel}
						className='mt-2 space-y-2'
					>
						<Input
							placeholder='Channel name'
							value={newChannelName}
							onChange={e => setNewChannelName(e.target.value)}
							className='h-8 text-sm'
							autoFocus
							disabled={isCreating}
						/>
						<div className='flex gap-2'>
							<Button
								type='submit'
								size='sm'
								className='h-7 px-2 text-xs'
								disabled={!newChannelName.trim() || isCreating}
							>
								{isCreating ? 'Creating...' : 'Create'}
							</Button>
							<Button
								type='button'
								size='sm'
								variant='ghost'
								className='h-7 px-2 text-xs'
								onClick={() => {
									setShowCreateForm(false)
									setNewChannelName('')
								}}
								disabled={isCreating}
							>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</div>

			<div className='flex-1 space-y-1 overflow-y-auto'>
				{channels.map(channel => {
					const isActive = match(`/message/${channel.id}`)(pathname)

					return (
						<div
							key={channel.id}
							className={cn(
								'group hover:bg-accent flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
								isActive && 'bg-accent font-medium'
							)}
						>
							<Link
								href={`/message/${channel.id}`}
								className='flex min-h-7 flex-1 items-center gap-2'
							>
								<Hash className='text-muted-foreground h-4 w-4' />
								<span className='truncate'>{channel.slug}</span>
							</Link>

							{channel.created_by === userId && (
								<div className='opacity-0 transition-opacity group-hover:opacity-100'>
									<Button
										size='sm'
										variant='ghost'
										className='text-muted-foreground hover:text-destructive h-6 w-6 p-0'
										onClick={() => handleDeleteChannel(channel.id)}
									>
										<Trash2 className='h-3 w-3' />
									</Button>
								</div>
							)}
						</div>
					)
				})}

				{channels.length === 0 && (
					<div className='text-muted-foreground text-center text-sm'>
						No channels yet. Create your first channel!
					</div>
				)}
			</div>

			<div className='mt-4 pt-4'>
				<Button
					variant='ghost'
					size='sm'
					className='w-full justify-start'
				>
					<Settings className='mr-2 h-4 w-4' />
					Settings
				</Button>
			</div>
		</div>
	)
}
