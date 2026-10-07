import { useCallback, useEffect, useState } from "react";

import {
    DEFAULT_DIFFICULTY,
    DIFFICULTIES,
    getConfig,
    getPairs,
    type Difficulty,
} from "../constants/difficulties";
import {
    getMoveLimit,
    getTimeLimit,
    type Settings,
} from "../constants/settings";
import { createDeck, type Card } from "../utils/deck";
import { useSettings } from "./useSettings";

const STORAGE_KEY = "memory-match:best-scores";
const MISMATCH_DELAY = 700;
export const MAX_BEST_SCORES = 5;

export type BestScore = {
    id?: string;
    moves: number;
    seconds: number;
};

type BestScores = Partial<Record<Difficulty, BestScore[]>>;

export type GameStatus = "playing" | "won" | "lost";
export type FailureReason = "moves" | "time";

export type GameResult = {
    entryId: string;
    moves: number;
    seconds: number;
    rank: number | null;
    isPersonalBest: boolean;
};

const createId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const isScore = (value: unknown): value is BestScore => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const { moves, seconds } = value as Record<string, unknown>;

    return (
        typeof moves === "number" &&
        Number.isFinite(moves) &&
        typeof seconds === "number" &&
        Number.isFinite(seconds)
    );
};

const loadBest = (): BestScores => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return {};
        }

        const parsed: unknown = JSON.parse(stored);

        if (!parsed || typeof parsed !== "object") {
            return {};
        }

        const result: BestScores = {};

        for (const { id } of DIFFICULTIES) {
            const list = (parsed as Record<string, unknown>)[id];

            if (Array.isArray(list)) {
                result[id] = list.filter(isScore);
            }
        }

        return result;
    } catch (error) {
        console.warn("Could not read best scores:", error);
        return {};
    }
};

const saveBest = (scores: BestScores) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
        console.warn("Could not save best scores:", error);
    }
};

const sortScores = (scores: BestScore[]) => {
    return [...scores].sort((a, b) => {
        if (a.moves !== b.moves) {
            return a.moves - b.moves;
        }

        return a.seconds - b.seconds;
    });
};

export const useMemoryGame = () => {
    const { mode, preferences, save } = useSettings();

    const [difficulty, setDifficulty] =
        useState<Difficulty>(DEFAULT_DIFFICULTY);

    const [cards, setCards] = useState<Card[]>(() =>
        createDeck(getPairs(getConfig(DEFAULT_DIFFICULTY))),
    );

    const [gameId, setGameId] = useState(0);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [justMatched, setJustMatched] = useState(false);
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [started, setStarted] = useState(false);
    const [best, setBest] = useState<BestScores>(loadBest);
    const [result, setResult] = useState<GameResult | null>(null);

    const config = getConfig(difficulty);

    const matchedCount = cards.filter((card) => card.matched).length;
    const complete = cards.length > 0 && matchedCount === cards.length;

    const totalPairs = cards.length / 2;
    const matchedPairs = matchedCount / 2;

    const moveLimit = mode === "moves" ? getMoveLimit(totalPairs) : null;
    const timeLimit = mode === "clock" ? getTimeLimit(totalPairs) : null;

    const outOfMoves = moveLimit !== null && moves >= moveLimit;
    const outOfTime = timeLimit !== null && seconds >= timeLimit;

    const status: GameStatus = complete
        ? "won"
        : outOfMoves || outOfTime
          ? "lost"
          : "playing";

    const failureReason: FailureReason | null =
        status !== "lost" ? null : outOfMoves ? "moves" : "time";

    const remainingMoves =
        moveLimit !== null ? Math.max(moveLimit - moves, 0) : null;
    const remainingSeconds =
        timeLimit !== null ? Math.max(timeLimit - seconds, 0) : null;

    const rankings = sortScores(best[difficulty] ?? []).slice(
        0,
        MAX_BEST_SCORES,
    );
    const bestScore = rankings[0];

    const message = (() => {
        if (status === "won") return "Board complete. Nice work!";
        if (outOfMoves) return "Out of moves. Restart to try again";
        if (outOfTime) return "Time's up. Restart to try again";
        if (flipped.length === 2) return "Not a match, try again";
        if (flipped.length === 1) return "Now find its matching pair";
        if (justMatched) return "A perfect match!";
        if (!started) return `${config.label}: find ${totalPairs} pairs`;

        return "Choose a card to keep playing";
    })();

    const startGame = useCallback((id: Difficulty) => {
        setCards(createDeck(getPairs(getConfig(id))));
        setGameId((game) => game + 1);
        setFlipped([]);
        setJustMatched(false);
        setMoves(0);
        setSeconds(0);
        setStarted(false);
        setResult(null);
    }, []);

    const changeDifficulty = useCallback(
        (id: Difficulty) => {
            setDifficulty(id);
            startGame(id);
        },
        [startGame],
    );

    const restart = useCallback(
        () => startGame(difficulty),
        [startGame, difficulty],
    );

    const applySettings = useCallback(
        (next: Settings) => {
            save(next);
            if (next.mode !== mode) startGame(difficulty);
        },
        [save, mode, startGame, difficulty],
    );

    const recordBest = useCallback(
        (
            id: Difficulty,
            finalMoves: number,
            finalSeconds: number,
        ): GameResult => {
            const entryId = createId();

            const nextScores = sortScores([
                ...(best[id] ?? []),
                { id: entryId, moves: finalMoves, seconds: finalSeconds },
            ]).slice(0, MAX_BEST_SCORES);

            const next = {
                ...best,
                [id]: nextScores,
            };

            setBest(next);
            saveBest(next);

            const index = nextScores.findIndex((score) => score.id === entryId);

            return {
                entryId,
                moves: finalMoves,
                seconds: finalSeconds,
                rank: index === -1 ? null : index + 1,
                isPersonalBest: index === 0,
            };
        },
        [best],
    );

    const flipCard = useCallback(
        (id: number) => {
            if (status !== "playing" || flipped.includes(id)) {
                return;
            }

            const card = cards.find((item) => item.id === id);

            if (!card || card.matched) {
                return;
            }

            setStarted(true);

            if (flipped.length !== 1) {
                setJustMatched(false);
                setFlipped([id]);
                return;
            }

            const firstCard = cards.find((item) => item.id === flipped[0]);
            const nextMoves = moves + 1;

            setMoves(nextMoves);

            if (firstCard && firstCard.icon === card.icon) {
                setCards((prev) =>
                    prev.map((item) =>
                        item.id === firstCard.id || item.id === id
                            ? { ...item, matched: true }
                            : item,
                    ),
                );

                setFlipped([]);
                setJustMatched(true);

                const remaining = cards.filter((item) => !item.matched).length;

                if (remaining === 2) {
                    setResult(recordBest(difficulty, nextMoves, seconds));
                }
            } else {
                setFlipped([flipped[0], id]);
            }
        },
        [cards, difficulty, flipped, moves, recordBest, seconds, status],
    );

    useEffect(() => {
        if (flipped.length !== 2) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setFlipped([]);
        }, MISMATCH_DELAY);

        return () => window.clearTimeout(timeout);
    }, [flipped]);

    useEffect(() => {
        if (!started || status !== "playing") {
            return;
        }

        const timer = window.setInterval(() => {
            setSeconds((current) => current + 1);
        }, 1000);

        return () => window.clearInterval(timer);
    }, [started, status]);

    return {
        difficulty,
        config,
        cards,
        gameId,
        flipped,
        moves,
        seconds,
        started,
        complete,
        status,
        failureReason,
        result,
        rankings,
        mode,
        preferences,
        moveLimit,
        timeLimit,
        remainingMoves,
        remainingSeconds,
        bestScore,
        matchedPairs,
        totalPairs,
        message,
        flipCard,
        changeDifficulty,
        applySettings,
        restart,
    };
};
