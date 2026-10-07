import { useState } from "react";
import { X } from "lucide-react";

import styles from "./SettingsModal.module.scss";

import {
    DEFAULT_SETTINGS,
    type PreferenceId,
    type Settings,
} from "../../constants/settings";
import { useGame } from "../../hooks/useGame";

import GameModeSection from "./GameModeSection";
import PreferenceList from "./PreferenceList";

type SettingsFormProps = {
    onClose: () => void;
};

const SettingsForm = ({ onClose }: SettingsFormProps) => {
    const { mode, preferences, totalPairs, applySettings } = useGame();

    const [draft, setDraft] = useState<Settings>({
        mode,
        preferences,
    });

    const toggle = (id: PreferenceId) => {
        setDraft((current) => ({
            ...current,
            preferences: {
                ...current.preferences,
                [id]: !current.preferences[id],
            },
        }));
    };

    const reset = () => {
        setDraft(DEFAULT_SETTINGS);
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
                <GameModeSection
                    mode={draft.mode}
                    totalPairs={totalPairs}
                    onSelect={(mode) =>
                        setDraft((current) => ({
                            ...current,
                            mode,
                        }))
                    }
                />

                <PreferenceList
                    preferences={draft.preferences}
                    onToggle={toggle}
                />
            </div>

            <footer className={styles.footer}>
                <button type="button" className={styles.reset} onClick={reset}>
                    Reset all settings to default
                </button>

                <button type="button" className={styles.done} onClick={done}>
                    Done
                </button>
            </footer>
        </>
    );
};

export default SettingsForm;
