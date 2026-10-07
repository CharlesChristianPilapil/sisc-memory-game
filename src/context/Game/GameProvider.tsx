import type { ReactNode } from "react";
import { GameContext } from "./GameContext";
import { useMemoryGame } from "../../hooks/useMemoryGame";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const game = useMemoryGame();
    return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
