import { GameMode, useModeStore } from "@/stores/modeStore";
import Button from "../Shared/Button/Button";
import styled from "styled-components";

const ModeSelector = () => {
  const { currentMode, setMode } = useModeStore();

  const handleModeClick = (mode: GameMode) => {
    setMode(mode);
  };

  return (
    <ModeSelectorContainer>
      <Button
        borderRadius="large"
        size="small"
        onClick={() => handleModeClick("singleplayer")}
        text="Single Player"
        $active={currentMode === "singleplayer"}
      />
      <Button
        borderRadius="large"
        size="small"
        onClick={() => handleModeClick("multiplayer")}
        text="Multiplayer"
        $active={currentMode === "multiplayer"}
      />
      <Button
        borderRadius="large"
        size="small"
        onClick={() => handleModeClick("battle-royale")}
        text="Battle Royale"
      />
    </ModeSelectorContainer>
  );
};

const ModeSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  button {
    width: 100%;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default ModeSelector;
