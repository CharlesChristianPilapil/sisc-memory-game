export const MODES = [
    {
        id: "classic",
        title: "Classic",
        copy: "Find all pairs at your own pace.",
    },
    {
        id: "moves",
        title: "Limited Moves",
        copy: "Match every pair before moves run out.",
    },
    {
        id: "clock",
        title: "Beat the Clock",
        copy: "Clear the board before time runs out.",
    },
] as const;

export const PREFERENCES = [
    {
        id: "numbered",
        label: "Numbered Cards",
        copy: "Show a number on the back of each card.",
    },
    {
        id: "hideMatched",
        label: "Hide Matched",
        copy: "Gently fade matched cards from the board.",
    },
    {
        id: "hideTimer",
        label: "Hide Timer",
        copy: "Hide the game timer during play.",
    },
    {
        id: "hideMoves",
        label: "Hide Moves",
        copy: "Hide the move counter during play.",
    },
] as const;

export type GameMode = (typeof MODES)[number]["id"];
export type PreferenceId = (typeof PREFERENCES)[number]["id"];
export type Preferences = Record<PreferenceId, boolean>;

export type Settings = {
    mode: GameMode;
    preferences: Preferences;
};

export const DEFAULT_SETTINGS: Settings = {
    mode: "classic",
    preferences: {
        numbered: true,
        hideMatched: false,
        hideTimer: false,
        hideMoves: false,
    },
};

export const getMoveLimit = (pairs: number) => pairs * 2;
export const getTimeLimit = (pairs: number) => pairs * 6;
