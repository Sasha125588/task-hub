'use client'

import { Hash, Plus, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { deleteChannel } from '@/utils/api'
import { cn } from '@/utils/helpers/cn'
import { useUser } from '@/utils/hooks/auth/useUser'
import { useRealtimeChannels } from '@/utils/hooks/chat/useRealtimeChannels'

import { CreateChannelForm } from './components/CreateChannelForm/CreateChannelForm'

export function ChannelsSidebar() {
	const [showCreateForm, setShowCreateForm] = useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const { userId } = useUser()
	const channels = useRealtimeChannels()

	const handleDeleteChannel = async (channelId: string) => {
		try {
			await deleteChannel(channelId)
			toast.success('Channel deleted successfully')
			router.push('/message')
		} catch (error) {
			toast.error('Failed to delete channel', {
				description: error instanceof Error ? error.message : 'Unknown error'
			})
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

				{showCreateForm && <CreateChannelForm onClose={() => setShowCreateForm(false)} />}
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
			</div>

			<div className='mt-4 pt-4'>
				<Button
					variant='ghost'
					size='sm'
					className='w-full cursor-pointer justify-start'
				>
					<Settings className='mr-2 h-4 w-4' />
					Settings
				</Button>
			</div>
		</div>
	)
}
