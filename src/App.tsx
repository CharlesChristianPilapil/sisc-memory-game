import styles from "./App.module.scss";
import BoardPanel from "./components/BoardPanel";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import ResultModal from "./components/ResultModal";
import { GameProvider } from "./context/Game/GameProvider";

function App() {
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
