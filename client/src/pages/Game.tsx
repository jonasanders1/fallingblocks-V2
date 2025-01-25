import { useModeStore } from "@/stores/modeStore";
import SinglePlayerGame from "@/components/modes/SinglePlayerGame";
import MultiplayerGame from "@/components/modes/MultiplayerGame";
import ModeSelector from "@/components/ModeSelector/ModeSelector";
import Modal from "@/components/Shared/Modal/Modal";
import { useState } from "react";

const Game = () => {
  const currentMode = useModeStore((state) => state.currentMode);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const renderGameMode = () => {
    switch (currentMode) {
      case "singleplayer":
        return <SinglePlayerGame />;
      case "multiplayer":
        return <MultiplayerGame />;
      case "battle-royale":
        return <div>Battle Royale Mode (Coming Soon)</div>;
      default:
        return <ModeSelector setIsModalOpen={setIsModalOpen} />;
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen}>
        <ModeSelector setIsModalOpen={setIsModalOpen} />
      </Modal>
      {renderGameMode()}
    </div>
  );
};

export default Game;
