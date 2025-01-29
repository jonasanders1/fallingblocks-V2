import GameContainer from "@/components/Game/GameContainer";

import { useGameCoordinator } from "@/stores/useGameCoordinator";
import { useGameControls } from "@/hooks/useGameControls";
import { useEffect } from "react";

const SinglePlayerGame = () => {
  const { initGame, endGame } = useGameCoordinator();
  useGameControls();

  useEffect(() => {
    initGame();
    return () => endGame();
  }, []);

  return <GameContainer $isOpponent={false} />;
};

export default SinglePlayerGame;
