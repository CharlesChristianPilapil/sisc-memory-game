import MemoryCard from "../MemoryCard";
import styles from "./BoardPanel.module.scss";
import { useGame } from "../../hooks/useGame";

const BoardPanel = () => {
    const {
        cards,
        gameId,
        flipped,
        config,
        flipCard,
        message,
        matchedPairs,
        totalPairs,
    } = useGame();

    return (
        <div className={styles["board-panel"]}>
            <div className={styles.head}>
                <h2>{message}</h2>
                <p>
                    {matchedPairs} of {totalPairs} pairs
                </p>
            </div>
            <div
                className={styles.grid}
                style={{ "--cols": config.cols } as React.CSSProperties}
            >
                {cards.map((card, i) => (
                    <MemoryCard
                        key={`${gameId}-${card.id}`}
                        icon={card.icon}
                        index={i}
                        flipped={flipped.includes(card.id)}
                        matched={card.matched}
                        onFlip={() => flipCard(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardPanel;
