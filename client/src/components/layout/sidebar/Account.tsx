"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/animate-ui/radix/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export function Account() {
  const { isMobile } = useSidebar();
  const { signOut, user, isLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to log out";
      toast.error(errMsg);
    }
  };

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarHeader className="mb-0 pb-0">
          <p className="text-sidebar-foreground/70 text-[13px]">Account</p>
        </SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return null;
  }

  const userInitials = user.userInfo.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const AccountInfo = () => (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.userInfo.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.userInfo.email}
        </span>
      </div>
    </div>
  );

  return (
    <SidebarMenu>
      <SidebarHeader className="mb-0 pb-0">
        <p className="text-sidebar-foreground/70 text-[13px]">Account</p>
      </SidebarHeader>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:text-sidebar-accent-foreground transition duration-300"
            >
              <AccountInfo />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-2">
              <AccountInfo />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Refresh Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
