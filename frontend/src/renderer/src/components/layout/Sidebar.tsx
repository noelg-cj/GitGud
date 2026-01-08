// src/components/layout/Sidebar.tsx
import { Separator } from "../ui/separator"
import { SidebarNavItem } from "./sidebar/SidebarNavItem"
import { SidebarRecentProjects } from "./sidebar/SidebarRecentProjects"
import { SidebarProfile } from "./sidebar/SidebarProfile"

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className="
        flex h-screen flex-col
        border-r
        bg-background
      "
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Utilities */}
      <div className="p-2">
        <SidebarNavItem
          icon="🔔"
          label="Notifications"
          badge={3}
          collapsed={collapsed}
        />
        <SidebarNavItem
          icon="📥"
          label="Inbox"
          collapsed={collapsed}
        />
      </div>

      <Separator />

      {/* Core navigation */}
      <div className="p-2">
        <SidebarNavItem
          icon="📊"
          label="Dashboard"
          active
          collapsed={collapsed}
        />
        <SidebarNavItem
          icon="📁"
          label="Projects"
          collapsed={collapsed}
        />
        <SidebarNavItem
          icon="✅"
          label="Tasks"
          collapsed={collapsed}
        />
      </div>

      <Separator />

      {/* Recent projects */}
      <SidebarRecentProjects collapsed={collapsed} />

      <div className="flex-1" />

      {/* Profile */}
      <SidebarProfile onSettings={() => {}} collapsed={collapsed} />
    </aside>
  )
}
