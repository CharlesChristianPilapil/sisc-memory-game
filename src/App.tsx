import styles from "./App.module.scss";
import BoardPanel from "./components/BoardPanel";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import ResultModal from "./components/ResultModal";
import { GameProvider } from "./context/Game/GameProvider";

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
