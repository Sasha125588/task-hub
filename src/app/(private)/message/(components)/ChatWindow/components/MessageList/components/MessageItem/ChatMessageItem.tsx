import { formatDate } from 'date-fns'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { useGetUserQuery } from '@/utils/api/hooks/chat/useGetUserQuery'

import type { Database } from '../../../../../../../../../../generated/database.types'

interface ChatMessageItemProps {
	message: Database['public']['Tables']['messages']['Row']
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
	const formattedTime = formatDate(message.inserted_at, 'p')
	const { data: user } = useGetUserQuery(message.user_id!)

	const username = user?.name ?? 'User'

	return (
		<div className='group hover:bg-muted/50 relative flex items-center gap-2 rounded-lg px-4 py-1 transition-colors'>
			<motion.div
				whileHover={{ scale: 1.1 }}
				className='flex cursor-pointer items-center gap-2'
			>
				{user?.image ? (
					<Image
						src={user.image}
						alt={username}
						width={28}
						height={28}
						className='rounded-full'
					/>
				) : (
					<Avatar className='size-7'>
						<AvatarFallback className='bg-accent'>{username?.charAt(0)}</AvatarFallback>
					</Avatar>
				)}
			</motion.div>
			<div>
				<div className='mb-1 flex items-baseline gap-2'>
					<span className='text-sm font-medium'>{username}</span>
					<span className='text-muted-foreground text-xs'>{formattedTime}</span>
				</div>
				<div className='text-sm leading-relaxed'>{message.message}</div>
			</div>
		</div>
	)
}
