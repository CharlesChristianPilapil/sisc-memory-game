import { useEffect, useRef, useState } from "react";
import { Check, Frown, Sparkles, X } from "lucide-react";

import styles from "./ResultModal.module.scss";

import { useGame } from "../../hooks/useGame";
import { formatTime } from "../../utils/time";

import ResultStats from "./ResultStats";
import RankingList from "./RankingList";

const REVEAL_DELAY = 600;

const FAILURE_COPY = {
    moves: "You ran out of moves.",
    time: "Time's up.",
} as const;

const ResultModal = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [visibleId, setVisibleId] = useState<number | null>(null);

    const {
        gameId,
        status,
        failureReason,
        result,
        rankings,
        moves,
        seconds,
        matchedPairs,
        totalPairs,
        restart,
    } = useGame();

    const won = status === "won";
    const open = status !== "playing" && visibleId === gameId;

    useEffect(() => {
        if (status === "playing") {
            return;
        }

        const timeout = window.setTimeout(() => {
            setVisibleId(gameId);
        }, REVEAL_DELAY);

        return () => window.clearTimeout(timeout);
    }, [status, gameId]);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    const close = () => {
        setVisibleId(null);
    };

    const finalMoves = result?.moves ?? moves;
    const finalSeconds = result?.seconds ?? seconds;

    const standing = (() => {
        if (!won || !result) {
            return null;
        }

        if (result.isPersonalBest) {
            return "New personal best";
        }

        if (result.rank !== null) {
            return `Ranked #${result.rank} on the leaderboard`;
        }

        return "Not in the rankings this time";
    })();

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="result-title"
            onClose={close}
            onClick={(event) => {
                if (event.target === dialogRef.current) {
                    close();
                }
            }}
        >
            {open && (
                <div className={styles.body}>
                    <button
                        type="button"
                        className={styles.close}
                        onClick={close}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                    <div
                        className={`${styles.mark} ${
                            won ? styles.success : styles.failure
                        }`}
                    >
                        {won ? <Check /> : <Frown />}
                    </div>

                    <p className={styles.eyebrow}>
                        {won ? "Board complete" : "Game over"}
                    </p>

                    <h2 id="result-title">
                        {won ? "You did it!" : "Not this time"}
                    </h2>

                    <p className={styles.copy}>
                        {won
                            ? "Every pair found. That memory is looking sharp."
                            : failureReason
                              ? FAILURE_COPY[failureReason]
                              : ""}
                    </p>

                    <ResultStats
                        won={won}
                        moves={finalMoves}
                        seconds={finalSeconds}
                        matchedPairs={matchedPairs}
                        totalPairs={totalPairs}
                    />

                    {standing && (
                        <div
                            className={`${styles.standing} ${
                                result?.isPersonalBest ? styles.best : ""
                            }`}
                        >
                            <Sparkles size={18} aria-hidden="true" />
                            <strong>{standing}</strong>
                        </div>
                    )}

                    {won && rankings.length > 0 && (
                        <RankingList rankings={rankings} result={result} />
                    )}

                    {won && result && result.rank === null && (
                        <div className={styles["your-score"]}>
                            <strong>Your Score</strong>

                            <span>
                                {result.moves} moves ·{" "}
                                {formatTime(result.seconds)}
                            </span>
                        </div>
                    )}

                    <button
                        type="button"
                        className={styles.play}
                        onClick={restart}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </dialog>
    );
};

export default ResultModal;
