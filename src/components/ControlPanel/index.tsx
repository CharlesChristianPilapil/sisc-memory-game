import { RotateCw, Settings } from "lucide-react";

import styles from "./ControlPanel.module.scss";

import { DIFFICULTIES } from "../../constants/difficulties";
import { useGame } from "../../hooks/useGame";
import { formatTime } from "../../utils/time";

const ControlPanel = () => {
    const {
        started,
        difficulty,
        moves,
        seconds,
        bestScore,
        changeDifficulty,
        restart,
    } = useGame();

    const best = bestScore?.moves ?? "---";

    const STATS = [
        { label: "Moves", value: moves, hint: "Your turns" },
        { label: "Time", value: formatTime(seconds), hint: "Starts on flip" },
        { label: "Best", value: best, hint: "Moves" },
    ];

    return (
        <div className={styles["control-panel"]}>
            <div>
                <h2>Game Progress</h2>

                <div className={styles["stat-wrapper"]}>
                    {STATS.map(({ label, value, hint }) => (
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
                    <button type="button">
                        <Settings size={16} />
                        Settings
                    </button>
                    <button type="button" onClick={restart} disabled={!started}>
                        <RotateCw size={16} />
                        Restart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
