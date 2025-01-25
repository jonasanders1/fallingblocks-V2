import GameContainer from "@/components/Game/GameContainer";
import { useGameStore } from "@/stores/gameStore";
import { useEffect } from "react";
// import { useSocket } from '@/hooks/useSocket';

const MultiplayerGame = () => {
  const initGame = useGameStore((state) => state.init);
  // const socket = useSocket();

  useEffect(() => {
    initGame();
    // socket.connect();

    return () => {
      // socket.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <GameContainer isPlayer={true} />
      <GameContainer isPlayer={false} />
    </div>
  );
};

export default MultiplayerGame;
