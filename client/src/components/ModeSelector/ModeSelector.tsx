import { GameMode, useModeStore } from "@/stores/modeStore";
import Button from "../Shared/Button/Button";
import styled from "styled-components";

const ModeSelector = () => {
  const setMode = useModeStore((state) => state.setMode);

  const handleModeClick = (mode: GameMode) => {
    setMode(mode);
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
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.shadows.medium};
  background-color: ${({ theme }) => theme.background.secondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export default ModeSelector;
