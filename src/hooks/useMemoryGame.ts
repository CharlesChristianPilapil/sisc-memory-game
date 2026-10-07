import { useCallback, useEffect, useState } from "react";

import {
    DEFAULT_DIFFICULTY,
    getConfig,
    getPairs,
    type Difficulty,
} from "../constants/difficulties";

import { createDeck, type Card } from "../utils/deck";

const STORAGE_KEY = "memory-match:best-scores";
const MISMATCH_DELAY = 700;
const MAX_BEST_SCORES = 5;

type BestScore = {
    moves: number;
    seconds: number;
};

type BestScores = Partial<Record<Difficulty, BestScore[]>>;

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

        return parsed as BestScores;
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

    const config = getConfig(difficulty);

    const matchedCount = cards.filter((card) => card.matched).length;
    const complete = cards.length > 0 && matchedCount === cards.length;

    const locked = flipped.length === 2;

    const totalPairs = cards.length / 2;
    const matchedPairs = matchedCount / 2;

    const bestScore = best[difficulty]?.[0];

    const isPlaying = started && !complete;

    const message = (() => {
        if (complete) return "Board complete. Nice work!";
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

    const recordBest = useCallback(
        (id: Difficulty, finalMoves: number, finalSeconds: number) => {
            const currentScores = best[id] ?? [];

            const nextScores = sortScores([
                ...currentScores,
                {
                    moves: finalMoves,
                    seconds: finalSeconds,
                },
            ]).slice(0, MAX_BEST_SCORES);

            const next = {
                ...best,
                [id]: nextScores,
            };

            setBest(next);
            saveBest(next);
        },
        [best],
    );

    const flipCard = useCallback(
        (id: number) => {
            if (flipped.includes(id)) {
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
                    recordBest(difficulty, nextMoves, seconds);
                }
            } else {
                setFlipped([flipped[0], id]);
            }
        },
        [cards, difficulty, flipped, moves, recordBest, seconds],
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
        if (!started || complete) {
            return;
        }

        const timer = window.setInterval(() => {
            setSeconds((current) => current + 1);
        }, 1000);

        return () => window.clearInterval(timer);
    }, [started, complete]);

    return {
        difficulty,
        config,
        cards,
        gameId,
        flipped,
        moves,
        seconds,
        started,
        isPlaying,
        complete,
        locked,
        bestScore,
        matchedPairs,
        totalPairs,
        message,
        flipCard,
        changeDifficulty,
        restart,
    };
};
