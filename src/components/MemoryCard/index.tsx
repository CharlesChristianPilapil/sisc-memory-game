import styles from "./MemoryCard.module.scss";
import { CARD_ICONS, ICON_NAMES, type IconName } from "../../utils/icon";
import { Boxes, Check } from "lucide-react";

type MemoryCardProps = {
    icon: IconName;
    index: number;
    flipped: boolean;
    matched: boolean;
    numbered?: boolean;
    hideMatched?: boolean;
    onFlip: () => void;
};

const MemoryCard = ({
    icon,
    index,
    flipped,
    matched,
    numbered = false,
    hideMatched = false,
    onFlip,
}: MemoryCardProps) => {
    const Icon = CARD_ICONS[icon];
    const iconIndex = ICON_NAMES.indexOf(icon);
    const faceUp = flipped || matched;

    const className = [
        styles.card,
        faceUp && styles.flipped,
        matched && styles.matched,
        matched && hideMatched && styles.faded,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={className}
            onClick={onFlip}
            disabled={matched}
            aria-label={faceUp ? `${icon} card` : `Face-down card ${index + 1}`}
        >
            <span className={styles.inner}>
                <span className={`${styles.face} ${styles.back}`}>
                    <span
                        className={`${styles.orbit} ${styles["orbit-one"]}`}
                    />
                    <span
                        className={`${styles.orbit} ${styles["orbit-two"]}`}
                    />
                    <Boxes className={styles.logo} aria-hidden="true" />
                    <span className={styles.number}>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </span>

                <span
                    className={`${styles.face} ${styles.front} ${styles[`tone-${iconIndex % 4}`]}`}
                >
                    {numbered ? (
                        <span className={styles["front-number"]}>
                            {iconIndex + 1}
                        </span>
                    ) : (
                        <Icon strokeWidth={1.75} aria-hidden="true" />
                    )}
                    {matched && (
                        <span className={styles.check}>
                            <Check size={12} strokeWidth={3} />
                        </span>
                    )}
                </span>
            </span>
        </button>
    );
};

export default MemoryCard;
