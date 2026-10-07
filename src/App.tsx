import styles from "./App.module.scss";
import BoardPanel from "./components/BoardPanel";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import ResultModal from "./components/ResultModal";
import { GameProvider } from "./context/Game/GameProvider";
import notFound from "./assets/not-found.png";

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

function App() {
    if (window.location.pathname !== "/") {
        return <NotFound />;
    }

    return (
        <GameProvider>
            <ResultModal />
            <Header />
            <main className={styles["play-area"]}>
                <ControlPanel />
                <BoardPanel />
            </main>
        </GameProvider>
    );
}

export default App;
