import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./SettingsModal.module.scss";
import {
    DEFAULT_SETTINGS,
    MODES,
    PREFERENCES,
    getMoveLimit,
    getTimeLimit,
    type GameMode,
    type PreferenceId,
    type Settings,
} from "../../constants/settings";
import { useGame } from "../../hooks/useGame";
import { formatTime } from "../../utils/time";

type SettingsModalProps = {
    open: boolean;
    onClose: () => void;
};

const SettingsForm = ({ onClose }: { onClose: () => void }) => {
    const { mode, preferences, totalPairs, applySettings } = useGame();

    const [draft, setDraft] = useState<Settings>({ mode, preferences });

    const meta = {
        classic: "Infinite time & moves",
        moves: `${getMoveLimit(totalPairs)} moves`,
        clock: formatTime(getTimeLimit(totalPairs)),
    };

    const selectMode = (id: GameMode) => {
        setDraft((current) => ({ ...current, mode: id }));
    };

    const toggle = (id: PreferenceId) => {
        setDraft((current) => ({
            ...current,
            preferences: {
                ...current.preferences,
                [id]: !current.preferences[id],
            },
        }));
    };

    const done = () => {
        applySettings(draft);
        onClose();
    };

    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Make it yours</p>
                    <h2 id="settings-title">Game Settings</h2>
                    <p className={styles.subtitle}>
                        Customize your game experience.
                    </p>
                </div>
                <button
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close settings"
                >
                    <X size={18} />
                </button>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <div className={styles.title}>
                        <h3>Game mode</h3>
                        <p>Changing the mode starts a new game</p>
                    </div>
                    <div className={styles.modes} role="radiogroup">
                        {MODES.map(({ id, title, copy }) => (
                            <button
                                key={id}
                                type="button"
                                role="radio"
                                aria-checked={draft.mode === id}
                                className={`${styles.mode} ${draft.mode === id ? styles.selected : ""}`}
                                onClick={() => selectMode(id)}
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

                <section className={styles.section}>
                    <div className={styles.title}>
                        <h3>Board preferences</h3>
                        <p>Adjust how the game looks and responds</p>
                    </div>
                    <div className={styles.list}>
                        {PREFERENCES.map(({ id, label, copy }) => (
                            <div key={id} className={styles.row}>
                                <div>
                                    <strong>{label}</strong>
                                    <p>{copy}</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={draft.preferences[id]}
                                    aria-label={label}
                                    className={styles.toggle}
                                    onClick={() => toggle(id)}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer className={styles.footer}>
                <button
                    type="button"
                    className={styles.reset}
                    onClick={() => setDraft(DEFAULT_SETTINGS)}
                >
                    Reset all settings to default
                </button>
                <button type="button" className={styles.done} onClick={done}>
                    Done
                </button>
            </footer>
        </>
    );
};

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="settings-title"
            onClose={onClose}
            onClick={(event) => {
                if (event.target === dialogRef.current) onClose();
            }}
        >
            {open && <SettingsForm onClose={onClose} />}
        </dialog>
    );
};

export default SettingsModal;
