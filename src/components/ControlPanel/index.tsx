import { useState } from "react";
import { RotateCw, Settings } from "lucide-react";
import styles from "./ControlPanel.module.scss";
import SettingsModal from "../SettingsModal";
import { DIFFICULTIES } from "../../constants/difficulties";
import { useGame } from "../../hooks/useGame";
import { formatTime } from "../../utils/time";

const ControlPanel = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {
        started,
        difficulty,
        mode,
        preferences,
        moves,
        moveLimit,
        remainingMoves,
        seconds,
        remainingSeconds,
        bestScore,
        changeDifficulty,
        restart,
    } = useGame();

    const best = bestScore?.moves ?? "---";

    const movesValue = preferences.hideMoves
        ? "—"
        : moveLimit !== null
          ? `${moves} / ${moveLimit}`
          : moves;

    const movesHint =
        remainingMoves !== null ? `${remainingMoves} left` : "Your turns";

    const timeValue = preferences.hideTimer
        ? "—"
        : formatTime(remainingSeconds ?? seconds);

    const timeHint = mode === "clock" ? "Time left" : "Starts on flip";

    const stats = [
        { label: "Moves", value: movesValue, hint: movesHint },
        { label: "Time", value: timeValue, hint: timeHint },
        { label: "Best", value: best, hint: "Moves" },
    ];

    return (
        <div className={styles["control-panel"]}>
            <div>
                <h2>Game Progress</h2>
                <div className={styles["stat-wrapper"]}>
                    {stats.map(({ label, value, hint }) => (
                        <div key={label} className={styles.stat}>
                            <h3>{label}</h3>
                            <p>{value}</p>
                            <p>{hint}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.best}>
                    <div>
                        <h3>Best</h3>
                        <p>Moves</p>
                    </div>
                    <strong>{best}</strong>
                </div>
            </div>

            <hr className={styles.divider} />

            <div>
                <h2>Difficulty</h2>
                <div className={styles.difficulty}>
                    {DIFFICULTIES.map(({ id, label, cols, rows }) => (
                        <button
                            key={id}
                            type="button"
                            className={difficulty === id ? styles.active : ""}
                            disabled={difficulty === id}
                            onClick={() => changeDifficulty(id)}
                        >
                            <strong>{label}</strong>
                            <span>
                                {cols} x {rows}
                            </span>
                        </button>
                    ))}
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={() => setSettingsOpen(true)}>
                        <Settings size={16} />
                        Settings
                    </button>
                    <button type="button" onClick={restart} disabled={!started}>
                        <RotateCw size={16} />
                        Restart
                    </button>
                </div>
            </div>

            <SettingsModal
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </div>
    );
};

export default ControlPanel;
