import { useModeStore } from "@/stores/modeStore";
import SinglePlayerGame from "@/components/modes/SinglePlayerGame";
import MultiplayerGame from "@/components/modes/MultiplayerGame";
import ModeSelector from "@/components/ModeSelector/ModeSelector";

const Game = () => {
  const currentMode = useModeStore((state) => state.currentMode);

  const renderGameMode = () => {
    switch (currentMode) {
      case "singleplayer":
        return <SinglePlayerGame />;
      case "multiplayer":
        return <MultiplayerGame />;
      case "battle-royale":
        return <div>Battle Royale Mode (Coming Soon)</div>;
      default:
        return <ModeSelector />;
    }
  };
  if (currentMode === "") {
    return <ModeSelector />;
  } else {
    return <>{renderGameMode()}</>;
  }
};

export default Game;
