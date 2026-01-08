import { useState } from 'react'
import { GlobalSidebar } from './GlobalSidebar'
import { Outlet } from 'react-router-dom'

export type AppPage =
  | "dashboard"
  | "projects"
  | "tasks"
  | "inbox"
  | "notifications"
  | "settings"

const GlobalLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState<AppPage>("dashboard")
  return (
    <div className='flex flex-1 min-h-0'>
        <GlobalSidebar
          collapsed={sidebarCollapsed}
          activePage={activePage}
          onNavigate={setActivePage}
          onToggleCollapse={() =>
            setSidebarCollapsed((v) => !v)
          }
        />
        <main className='flex-1 overflow-auto'>
            <Outlet />
        </main>
    </div>
  )
}

export default GlobalLayout