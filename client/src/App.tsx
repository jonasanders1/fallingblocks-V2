import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import Layout from "./components/Layout/Layout";
import GameOptions from "./pages/GameOptions";

// Hooks
import { useEffect } from "react";
import { useModeStore } from "./stores/modeStore";

function App() {
  const { currentMode } = useModeStore();
  const { gameType, timeLimit } = useModeStore();

  useEffect(() => {
    console.log(gameType, timeLimit, currentMode);
  }, [gameType, timeLimit, currentMode]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/game-options" element={<GameOptions />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-over" element={<GameOver />} />
      </Route>
    </Routes>
  );
}

export default App;
