import GameContainer from "@/components/Game/GameContainer";
import { useGameCoordinator } from "@/stores/useGameCoordinator";
import { useEffect } from "react";
// import { useSocket } from '@/hooks/useSocket';

const MultiplayerGame = () => {
  const { initGame, endGame } = useGameCoordinator();
  // const socket = useSocket();

  useEffect(() => {
    initGame();
    // socket.connect();

    return () => {
      endGame();
      // socket.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <GameContainer $isPlayer={true} />
      <GameContainer $isPlayer={false} />
    </div>
  );
};

export default MultiplayerGame;
