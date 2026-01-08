import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@renderer/components/ui/avatar"
import { Button } from "@renderer/components/ui/button"

type SidebarProfileProps = {
  collapsed: boolean
  onSettings: () => void
}

export function SidebarProfile({
  collapsed,
  onSettings,
}: SidebarProfileProps) {
  return (
    <div className="border-t p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="flex flex-col items-start text-sm">
                <span>Noel</span>
                <span className="text-xs text-muted-foreground">
                  Settings
                </span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" align="end">
          <DropdownMenuItem onClick={onSettings}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
