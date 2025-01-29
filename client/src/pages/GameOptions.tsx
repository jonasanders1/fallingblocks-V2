import { useNavigate } from "react-router-dom";
import { useModeStore } from "@/stores/modeStore";
import styled from "styled-components";
import SinglePlayerOptions from "@/components/GameOptions/SinglePlayerOptions";
import MultiplayerOptions from "@/components/GameOptions/MultiplayerOptions";
import ModeSelector from "@/components/ModeSelector/ModeSelector";
import Button from "@/components/Shared/Button/Button";
import { useEffect } from "react";

const GameOptions = () => {
  const navigate = useNavigate();
  const { currentMode, setMode } = useModeStore();

  useEffect(() => {
    // Set default mode to singleplayer
    if (!currentMode) {
      setMode("singleplayer");
    }
  }, []);

  const handleStartGame = () => {
    if (currentMode) {
      navigate("/game");
    }
  };

  return (
    <StyledGameOptions>
      <StyledHeader>
        <h1>Game Options</h1>
        <p>Customize your game experience</p>
        <ModeSelector />
      </StyledHeader>

      <StyledContent>
        <StyledSection>
          {currentMode === "singleplayer" && <SinglePlayerOptions />}
          {currentMode === "multiplayer" && <MultiplayerOptions />}
          {currentMode === "battle-royale" && (
            <CommingSoon>
              <h2>Coming Soon</h2>
              <p>Battle Royale mode is coming soon!</p>
            </CommingSoon>
          )}
        </StyledSection>

        <Button
          onClick={handleStartGame}
          text="Start Game"
          $active={true}
          size="large"
          disabled={!currentMode || currentMode === "battle-royale"}
        />
      </StyledContent>
    </StyledGameOptions>
  );
};

const StyledGameOptions = styled.div`
  width: min(600px, 90vw);
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: clamp(0.9rem, 2vw, 1rem);
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const StyledSection = styled.section`
  background: ${({ theme }) => theme.containers.primary};
  border-radius: 1rem;
  padding: clamp(1.5rem, 4vw, 2rem);
  min-height: 314px;
  width: 100%;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadows.light};
`;

const CommingSoon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default GameOptions;
