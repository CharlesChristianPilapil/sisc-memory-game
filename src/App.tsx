import styles from "./App.module.scss";
import BoardPanel from "./components/BoardPanel";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <main className={styles["play-area"]}>
                <ControlPanel />
                <BoardPanel />
            </main>
        </>
    );
}

export default App;
