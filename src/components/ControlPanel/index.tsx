import { useState } from "react";
import styles from "./ControlPanel.module.scss";
import { RotateCw, Settings } from "lucide-react";

const DIFFICULTIES = [
    { id: "easy", label: "Easy", size: "4 x 4" },
    { id: "medium", label: "Medium", size: "5 x 5" },
    { id: "hard", label: "Hard", size: "6 x 6" },
] as const;

const STATS = [
    { label: "Moves", value: "0", hint: "Your turns" },
    { label: "Time", value: "00.00", hint: "Starts on flip" },
    { label: "Best", value: "---", hint: "Moves" },
] as const;

type Difficulty = (typeof DIFFICULTIES)[number]["id"];

const ControlPanel = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");

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
                    <strong>---</strong>
                </div>
            </div>
            <hr className={styles.divider} />
            <div>
                <h2>Difficulty</h2>
                <div className={styles.difficulty}>
                    {DIFFICULTIES.map(({ id, label, size }) => (
                        <button
                            key={id}
                            type="button"
                            className={difficulty === id ? styles.active : ""}
                            disabled={difficulty === id}
                            onClick={() => setDifficulty(id)}
                        >
                            <strong>{label}</strong>
                            <span>{size}</span>
                        </button>
                    ))}
                </div>
                <div className={styles.actions}>
                    <button type="button">
                        <Settings size={16} />
                        Settings
                    </button>
                    <button type="button">
                        <RotateCw size={16} />
                        Restart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
