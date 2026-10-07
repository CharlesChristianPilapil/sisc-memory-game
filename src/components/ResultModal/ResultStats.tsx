import styles from "./ResultModal.module.scss";
import { formatTime } from "../../utils/time";

type ResultStatsProps = {
    won: boolean;
    moves: number;
    seconds: number;
    matchedPairs: number;
    totalPairs: number;
};

const ResultStats = ({
    won,
    moves,
    seconds,
    matchedPairs,
    totalPairs,
}: ResultStatsProps) => {
    return (
        <dl className={styles.stats}>
            <div>
                <dt>Final time</dt>
                <dd>{formatTime(seconds)}</dd>
            </div>

            <div>
                <dt>Total moves</dt>
                <dd>{moves}</dd>
            </div>

            {!won && (
                <div>
                    <dt>Pairs found</dt>
                    <dd>
                        {matchedPairs} / {totalPairs}
                    </dd>
                </div>
            )}
        </dl>
    );
};

export default ResultStats;
