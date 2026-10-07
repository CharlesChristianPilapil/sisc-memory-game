import { useState } from "react";
import MemoryCard from "../MemoryCard";
import styles from "./BoardPanel.module.scss";
import { createDeck } from "../../utils/deck";

const COLS = 6;
const ROWS = 6;
const PAIRS = (COLS * ROWS) / 2;

const BoardPanel = () => {
    const [cards] = useState(() => createDeck(PAIRS));
    const [flipped, setFlipped] = useState<number[]>([]);

    const handleFlip = (id: number) => {
        setFlipped((current) =>
            current.includes(id) ? current : [...current, id],
        );
    };

    return (
        <div className={styles["board-panel"]}>
            <div className={styles.head}>
                <h2>Medium game ready — find 8 pairs</h2>
                <p> 0 of 2 pairs </p>
            </div>
            <div
                className={styles.grid}
                style={{ "--cols": COLS } as React.CSSProperties}
            >
                {cards.map((card, i) => (
                    <MemoryCard
                        key={card.id}
                        icon={card.icon}
                        index={i}
                        flipped={flipped.includes(card.id)}
                        matched={card.matched}
                        numbered={false}
                        hideMatched={false}
                        onFlip={() => handleFlip(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardPanel;
