import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@renderer/components/ui/avatar"

  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@renderer/components/ui/sidebar"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@renderer/components/ui/dropdown-menu"

  import avatar from "../../assets/self.jpg"
import { ChevronsUpDown, Sparkles } from 'lucide-react'

const UserCard = () => {
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton 
                        size='lg' 
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar>
                            <AvatarImage src={avatar} alt='User' />
                            <AvatarFallback>NG</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Noel George</span>
                            <span className="truncate text-xs text-zinc-300">noelg-cj</span>
                        </div>
                        <ChevronsUpDown />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="right"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel>
                        <div>
                            <Avatar>
                                <AvatarImage src={avatar} alt='User' />
                                <AvatarFallback>NG</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Noel George</span>
                                <span className="truncate text-xs text-zinc-300">noelg-cj</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default UserCard