import GameContainer from "@/components/Game/GameContainer";
import { useGameCoordinator } from "@/stores/useGameCoordinator";
import { useMultiplayerSync } from "@/hooks/useMultiplayerSync";
import { useEffect } from "react";

const MultiplayerGame = () => {
  const { initGame, endGame } = useGameCoordinator();
  const { emitGameState } = useMultiplayerSync("room-id"); // You'll need to implement room management

  useEffect(() => {
    initGame();

    // Emit state every 100ms
    const syncInterval = setInterval(emitGameState, 100);

    return () => {
      endGame();
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <GameContainer $isOpponent={false} />
      <GameContainer $isOpponent={true} />
    </div>
  );
};

export default MultiplayerGame;
