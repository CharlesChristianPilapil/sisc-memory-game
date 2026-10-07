import { PlayingCards } from "lucide-react";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <PlayingCards />
                </div>
                <div>
                    <h1>SISC Memory Game</h1>
                    <p>Test your memory and beat your best score.</p>
                </div>
            </div>

            <div className={styles.best}>
                <p>PERSONAL BEST</p>
                <strong> ---</strong>
            </div>
        </header>
    );
};
export default Header;
