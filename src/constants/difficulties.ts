export const DIFFICULTIES = [
    { id: "easy", label: "Easy", cols: 2, rows: 2 },
    { id: "medium", label: "Medium", cols: 4, rows: 4 },
    { id: "hard", label: "Hard", cols: 6, rows: 6 },
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number]["id"];
export type DifficultyConfig = (typeof DIFFICULTIES)[number];

export const getConfig = (id: Difficulty): DifficultyConfig => {
    return DIFFICULTIES.find((d) => d.id === id)!;
};

export const getPairs = ({ cols, rows }: DifficultyConfig) => (cols * rows) / 2;

export const DEFAULT_DIFFICULTY: Difficulty =
    DIFFICULTIES.find((d) => d.cols === 4 && d.rows === 4)?.id ?? "easy";
