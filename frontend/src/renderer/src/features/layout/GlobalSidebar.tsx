import { Separator } from "@renderer/components/ui/separator"
import { Button } from "@renderer/components/ui/button"
import { SidebarNavItem } from "@renderer/components/layout/sidebar/SidebarNavItem"
import { SidebarRecentProjects } from "@renderer/components/layout/sidebar/SidebarRecentProjects"
import { SidebarProfile } from "@renderer/components/layout/sidebar/SidebarProfile"
import type { AppPage } from "./GlobalLayout"

type Props = {
  collapsed: boolean
  activePage: AppPage
  onNavigate: (page: AppPage) => void
  onToggleCollapse: () => void
}

export function GlobalSidebar({
  collapsed,
  activePage,
  onNavigate,
  onToggleCollapse,
}: Props) {
  return (
    <aside
      className="flex h-screen flex-col border-r bg-secondary"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Utilities */}
      <div className="p-2">
        <SidebarNavItem
          icon="🔔"
          label="Notifications"
          active={activePage === "notifications"}
          collapsed={collapsed}
          onClick={() => onNavigate("notifications")}
        />
        <SidebarNavItem
          icon="📥"
          label="Inbox"
          active={activePage === "inbox"}
          collapsed={collapsed}
          onClick={() => onNavigate("inbox")}
        />
      </div>

      <Separator />

      {/* Core nav */}
      <div className="p-2">
        <SidebarNavItem
          icon="📊"
          label="Dashboard"
          active={activePage === "dashboard"}
          collapsed={collapsed}
          onClick={() => onNavigate("dashboard")}
        />
        <SidebarNavItem
          icon="📁"
          label="Projects"
          active={activePage === "projects"}
          collapsed={collapsed}
          onClick={() => onNavigate("projects")}
        />
        <SidebarNavItem
          icon="✅"
          label="Tasks"
          active={activePage === "tasks"}
          collapsed={collapsed}
          onClick={() => onNavigate("tasks")}
        />
      </div>

      <Separator />

      {/* Recent projects */}
      <SidebarRecentProjects collapsed={collapsed} />

      <div className="flex-1" />

      {/* Collapse toggle */}
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-center text-xs"
          onClick={onToggleCollapse}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      {/* Profile */}
      <SidebarProfile
        collapsed={collapsed}
        onSettings={() => onNavigate("settings")}
      />
    </aside>
  )
}
