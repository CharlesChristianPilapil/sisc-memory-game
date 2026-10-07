import styles from "./ResultModal.module.scss";
import { formatTime } from "../../utils/time";

import goldTrophy from "../../assets/gold-trophy.png";
import silverTrophy from "../../assets/silver-trophy.png";
import bronzeTrophy from "../../assets/bronze-trophy.png";
import type { BestScore } from "../../hooks/useMemoryGame";

type Result = {
    entryId: string | number | null;
};

type RankingListProps = {
    rankings: BestScore[];
    result: Result | null;
};

const TROPHIES: Record<number, { src: string; label: string }> = {
    1: {
        src: goldTrophy,
        label: "Gold trophy",
    },
    2: {
        src: silverTrophy,
        label: "Silver trophy",
    },
    3: {
        src: bronzeTrophy,
        label: "Bronze trophy",
    },
};

const RankingList = ({ rankings, result }: RankingListProps) => {
    return (
        <section className={styles.rankings} aria-label="Rankings">
            <h3>Rankings</h3>

            <ol>
                {rankings.map((score, index) => {
                    const rank = index + 1;
                    const trophy = TROPHIES[rank];

                    const isYou =
                        result !== null && score.id === result.entryId;

                    return (
                        <li
                            key={score.id ?? rank}
                            className={isYou ? styles.you : ""}
                            aria-current={isYou ? "true" : undefined}
                        >
                            <span className={styles.rank}>
                                {trophy ? (
                                    <img
                                        src={trophy.src}
                                        alt={trophy.label}
                                        width={28}
                                        height={28}
                                    />
                                ) : (
                                    rank
                                )}
                            </span>

                            <span>{score.moves} moves</span>

                            <span>{formatTime(score.seconds)}</span>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
};

export default RankingList;
