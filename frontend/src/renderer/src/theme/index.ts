import type { themeName } from "@shared/types/settings";

export const THEMES: Record<
  themeName,
  { label: string; description: string }
> = {
  orpheus: {
    label: "Orpheus",
    description: "Default Orpheus theme",
  },
  dark: {
    label: "Dark",
    description: "Neutral dark mode",
  },
  light: {
    label: "Light",
    description: "Bright light mode",
  },
  midnight: {
    label: "Midnight Blue",
    description: "Deep blue focused theme",
  },
  jade: {
    label: "Jade",
    description: "Green calm theme",
  },
}
