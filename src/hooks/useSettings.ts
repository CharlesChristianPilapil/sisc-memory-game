import { useCallback, useState } from "react";
import {
    DEFAULT_SETTINGS,
    MODES,
    PREFERENCES,
    type Settings,
} from "../constants/settings";

const STORAGE_KEY = "memory-match:settings";

const loadSettings = (): Settings => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return DEFAULT_SETTINGS;

        const parsed: unknown = JSON.parse(stored);
        if (!parsed || typeof parsed !== "object") return DEFAULT_SETTINGS;

        const { mode, preferences } = parsed as Record<string, unknown>;

        const validMode =
            MODES.find((item) => item.id === mode)?.id ?? DEFAULT_SETTINGS.mode;

        const validPreferences = { ...DEFAULT_SETTINGS.preferences };
        if (preferences && typeof preferences === "object") {
            for (const { id } of PREFERENCES) {
                const value = (preferences as Record<string, unknown>)[id];
                if (typeof value === "boolean") validPreferences[id] = value;
            }
        }

        return { mode: validMode, preferences: validPreferences };
    } catch (error) {
        console.warn("Could not read settings:", error);
        return DEFAULT_SETTINGS;
    }
};

const saveSettings = (settings: Settings) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.warn("Could not save settings:", error);
    }
};

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(loadSettings);

    const save = useCallback((next: Settings) => {
        setSettings(next);
        saveSettings(next);
    }, []);

    return {
        mode: settings.mode,
        preferences: settings.preferences,
        save,
    };
};
