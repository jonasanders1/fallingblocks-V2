import { GameMode, useModeStore } from "@/stores/modeStore";
import Button from "../Shared/Button/Button";
import styled from "styled-components";

const ModeSelector = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) => {
  const setMode = useModeStore((state) => state.setMode);

  const handleModeClick = (mode: GameMode) => {
    setMode(mode);
    setIsModalOpen(false);
  };

  return (
    <ModeSelectorContainer>
      <h2>Select Game Mode</h2>
      <ButtonGroup>
        <Button
          onClick={() => handleModeClick("singleplayer")}
          text="Single Player"
        />
        <Button
          onClick={() => handleModeClick("multiplayer")}
          text="Multiplayer"
        />
        <Button
          onClick={() => handleModeClick("battle-royale")}
          text="Battle Royale"
        />
      </ButtonGroup>
    </ModeSelectorContainer>
  );
};

const ModeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export default ModeSelector;
