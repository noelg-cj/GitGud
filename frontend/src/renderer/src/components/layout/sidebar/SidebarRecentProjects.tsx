// src/components/layout/sidebar/SidebarRecentProjects.tsx
import { Button } from "@renderer/components/ui/button"

export function SidebarRecentProjects({
  collapsed,
}: {
  collapsed: boolean
}) {
  if (collapsed) return null

  const projects = [
    { id: "1", name: "Orpheus Core" },
    { id: "2", name: "Website Redesign" },
    { id: "3", name: "Internal Tools" },
  ]

  return (
    <div className="px-2 py-1">
      <div className="px-2 py-1 text-xs uppercase text-muted-foreground">
        Recent projects
      </div>

      {projects.map((p) => (
        <Button
          key={p.id}
          variant="ghost"
          className="w-full justify-start truncate px-2 text-sm"
        >
          {p.name}
        </Button>
      ))}
    </div>
  )
}
