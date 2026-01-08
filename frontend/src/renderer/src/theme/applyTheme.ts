import type { themeName } from "@shared/types/settings"

export function applyTheme(theme: themeName) {
  document.documentElement.setAttribute("data-theme", theme)
}
