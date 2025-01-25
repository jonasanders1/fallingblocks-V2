import GameContainer from "@/components/Game/GameContainer";
import { useGameStore } from "@/stores/gameStore";
import { useEffect } from "react";

const SinglePlayerGame = () => {
  const initGame = useGameStore((state) => state.init);

  useEffect(() => {
    initGame();
  }, []);

  return <GameContainer isPlayer={true} />;
};

export default SinglePlayerGame;
