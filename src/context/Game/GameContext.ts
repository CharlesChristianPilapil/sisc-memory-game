import { createContext } from "react";
import type { useMemoryGame } from "../../hooks/useMemoryGame";

export type GameContextValue = ReturnType<typeof useMemoryGame>;

export const GameContext = createContext<GameContextValue | null>(null);
