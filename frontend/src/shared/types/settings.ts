export type themeName = "orpheus" | "light" | "dark" | "midnight" | "jade";

export type Settings = {
    theme: themeName;
}

export type SettingsFile = {
    version: 1;
    settings: Settings;
}