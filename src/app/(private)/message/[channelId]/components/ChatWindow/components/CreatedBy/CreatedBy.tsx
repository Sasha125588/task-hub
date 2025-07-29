import { motion } from 'framer-motion'

import { I18nText } from '@/components/common/I18nText/I18nText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import type { DBUser } from '@/types/db.types'

interface CreatedByProps {
	user: DBUser
}

export function CreatedBy({ user }: CreatedByProps) {
	return (
		<div className='flex items-center gap-2'>
			<span className='text-muted-foreground text-sm'>
				<I18nText path='createdBy' />
			</span>

			<div className='flex items-center gap-1'>
				<span className='text-primary/80 hover:text-primary cursor-pointer text-sm font-semibold transition-colors duration-200'>
					{user.name ?? 'User'}
				</span>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Avatar className='size-7 cursor-pointer'>
						<AvatarImage src={user.image ?? ''} />
						<AvatarFallback className='bg-accent'>{user.name?.charAt(0)}</AvatarFallback>
					</Avatar>
				</motion.div>
			</div>
		</div>
	)
}
