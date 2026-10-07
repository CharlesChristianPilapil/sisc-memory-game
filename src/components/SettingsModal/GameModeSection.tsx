import {
    MODES,
    getMoveLimit,
    getTimeLimit,
    type GameMode,
} from "../../constants/settings";
import { formatTime } from "../../utils/time";

import styles from "./SettingsModal.module.scss";

type GameModeSectionProps = {
    mode: GameMode;
    totalPairs: number;
    onSelect: (mode: GameMode) => void;
};

const GameModeSection = ({
    mode,
    totalPairs,
    onSelect,
}: GameModeSectionProps) => {
    const meta: Record<GameMode, string> = {
        classic: "Infinite time & moves",
        moves: `${getMoveLimit(totalPairs)} moves`,
        clock: formatTime(getTimeLimit(totalPairs)),
    };

    return (
        <section className={styles.section}>
            <div className={styles.title}>
                <h3>Game mode</h3>
                <p>Changing the mode starts a new game</p>
            </div>

            <div
                className={styles.modes}
                role="radiogroup"
                aria-label="Game mode"
            >
                {MODES.map(({ id, title, copy }) => (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={mode === id}
                        className={`${styles.mode} ${
                            mode === id ? styles.selected : ""
                        }`}
                        onClick={() => onSelect(id)}
                    >
                        <span className={styles.radio} />

                        <span className={styles["mode-copy"]}>
                            <strong>{title}</strong>
                            <span>{copy}</span>
                        </span>

                        <em>{meta[id]}</em>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default GameModeSection;
