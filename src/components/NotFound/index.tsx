import notFound from "../../assets/not-found.png";
import styles from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <main className={styles["not-found"]}>
            <div>
                <h1>404</h1>
                <img src={notFound} alt="not found logo" />
                <p>Page not found.</p>
                <a href="/">Back to game</a>
            </div>
        </main>
    );
};

export default NotFound;
