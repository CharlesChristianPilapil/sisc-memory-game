import {
    PREFERENCES,
    type PreferenceId,
    type Settings,
} from "../../constants/settings";

import styles from "./SettingsModal.module.scss";

type PreferenceListProps = {
    preferences: Settings["preferences"];
    onToggle: (id: PreferenceId) => void;
};

const PreferenceList = ({ preferences, onToggle }: PreferenceListProps) => {
    return (
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
                            aria-checked={preferences[id]}
                            aria-label={label}
                            className={styles.toggle}
                            onClick={() => onToggle(id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PreferenceList;
