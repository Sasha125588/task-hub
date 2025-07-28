'use client'

import type { User } from 'better-auth'
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
	User as UserIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '@/components/animate-ui/radix/sidebar'
import { I18nText } from '@/components/common/I18nText/I18nText'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { authClient, signOut } from '@/lib/better-auth/auth-client'

export function Account({ currentUser, isPending }: { currentUser: User; isPending: boolean }) {
	const router = useRouter()
	const { isMobile } = useSidebar()
	const userName = currentUser?.name
	const userEmail = currentUser?.email

	const handleSignOut = () => {
		signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success(<I18nText path='toast.loggedOut' />)
					router.push('/signin')
				},
				onError: () => {
					toast.error(<I18nText path='toast.failedLogout' />)
				}
			}
		})
	}

	const handleConfirmEmail = async () => {
		if (!userEmail) {
			toast.error(<I18nText path='toast.userEmailNotFound' />)
			return
		}

		await authClient.sendVerificationEmail({
			email: userEmail,
			callbackURL: '/dashboard'
		})
		toast.success(<I18nText path='toast.verificationEmailSent' />)
	}

	if (isPending) {
		return (
			<SidebarMenu>
				<SidebarHeader className='mb-0 pb-0'>
					<p className='text-sidebar-foreground/70 text-[13px]'>
						<I18nText path='sidebar.account' />
					</p>
				</SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton size='lg'>
						<Avatar className='h-8 w-8'>
							<AvatarFallback>
								<UserIcon className='h-4 w-4' />
							</AvatarFallback>
						</Avatar>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-medium'>
								<I18nText path='site.loading' />
							</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		)
	}

	if (!userName || !userEmail) {
		return null
	}

	const userInitials = userName
		.split(' ')
		.map((n: string) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)

	const AccountInfo = () => (
		<div className='flex items-center gap-2'>
			<Avatar className='h-8 w-8'>
				<AvatarFallback>
					{currentUser?.image ? (
						<Image
							src={currentUser.image}
							alt={userName}
							width={32}
							height={32}
						/>
					) : (
						userInitials
					)}
				</AvatarFallback>
			</Avatar>
			<div className='grid flex-1 text-left text-sm leading-tight'>
				<span className='truncate font-medium'>{userName}</span>
				<span className='text-muted-foreground truncate text-xs'>{userEmail}</span>
			</div>
		</div>
	)

	return (
		<SidebarMenu>
			<SidebarHeader className='mb-0 pb-0'>
				<p className='text-sidebar-foreground/70 text-[13px]'>
					<I18nText path='sidebar.account' />
				</p>
			</SidebarHeader>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:text-sidebar-accent-foreground transition duration-300'
						>
							<AccountInfo />
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-2'>
							<AccountInfo />
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={handleConfirmEmail}>
								<UserIcon className='mr-2 h-4 w-4' />
								<I18nText path='sidebar.account.confirmEmail' />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Sparkles className='mr-2 h-4 w-4' />
								<I18nText path='sidebar.account.upgradeToPro' />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck className='mr-2 h-4 w-4' />
								<I18nText path='sidebar.account.settings' />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCard className='mr-2 h-4 w-4' />
								<I18nText path='sidebar.account.billing' />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell className='mr-2 h-4 w-4' />
								<I18nText path='sidebar.account.notifications' />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignOut}>
							<LogOut className='mr-2 h-4 w-4' />
							<I18nText path='sidebar.account.logOut' />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
