// src/components/layout/sidebar/SidebarNavItem.tsx
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip"
import { cn } from "@renderer/lib/utils"

type Props = {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
  collapsed: boolean,
  onClick?: () => void
}

export function SidebarNavItem({
  icon,
  label,
  active,
  badge,
  collapsed,
  onClick,
}: Props) {
  const button = (
    <Button
      onClick={onClick}
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 px-2",
        collapsed && "justify-center px-0"
      )}
    >
      <span className="text-base">{icon}</span>

      {!collapsed && (
        <span className="flex-1 text-left text-sm">
          {label}
        </span>
      )}

      {!collapsed && badge !== undefined && (
        <Badge variant="default">{badge}</Badge>
      )}
    </Button>
  )

  // Tooltip is ONLY for collapsed mode
  if (!collapsed) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent side="right">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
