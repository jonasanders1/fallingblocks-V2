import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGameCoordinator } from "../stores/useGameCoordinator";
import { Gamepad2 } from "lucide-react";
import { useModeStore } from "../stores/modeStore";
import { useState } from "react";

const GameOptions = () => {
  const navigate = useNavigate();
  const { initGame } = useGameCoordinator();
  const { setMode, setGameType, setTimeLimit } = useModeStore();
  const [selectedMode, setSelectedMode] = useState("endless");
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(3);

  const handleStartGame = () => {
    // Set game mode to singleplayer
    setMode("singleplayer");

    // Set game type and time limit based on mode selection
    if (selectedMode === "timed") {
      setTimeLimit(selectedTimeLimit * 60);
      setGameType("timed");
    } else {
      setTimeLimit(Infinity);
      setGameType("endless");
    }

    // Initialize game and navigate
    initGame();
    navigate("/game");
  };

  return (
    <StyledGameOptions>
      <OptionsContainer>
        <h1>Game Options</h1>
        <OptionsGrid>
          <OptionCard>
            <CardHeader>
              <Gamepad2 size={24} />
              <h2>Game Mode</h2>
            </CardHeader>
            <OptionGroup>
              <OptionButton
                $active={selectedMode === "endless"}
                onClick={() => setSelectedMode("endless")}
              >
                Endless
              </OptionButton>
              <OptionButton
                $active={selectedMode === "timed"}
                onClick={() => setSelectedMode("timed")}
              >
                Time Limit
              </OptionButton>
              {selectedMode === "timed" && (
                <TimeLimitOptions>
                  <TimeButton
                    $active={selectedTimeLimit === 3}
                    onClick={() => setSelectedTimeLimit(3)}
                  >
                    3 Minutes
                  </TimeButton>
                  <TimeButton
                    $active={selectedTimeLimit === 5}
                    onClick={() => setSelectedTimeLimit(5)}
                  >
                    5 Minutes
                  </TimeButton>
                  <TimeButton
                    $active={selectedTimeLimit === 10}
                    onClick={() => setSelectedTimeLimit(10)}
                  >
                    10 Minutes
                  </TimeButton>
                </TimeLimitOptions>
              )}
              <OptionButton $disabled>
                Multiplayer
                <ComingSoonTag>Coming Soon</ComingSoonTag>
              </OptionButton>
            </OptionGroup>
          </OptionCard>
        </OptionsGrid>

        <ButtonGroup>
          <BackButton onClick={() => navigate("/")}>Back</BackButton>
          <StartButton onClick={handleStartGame}>Start Game</StartButton>
        </ButtonGroup>
      </OptionsContainer>
    </StyledGameOptions>
  );
};

const StyledGameOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
`;

const OptionsContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const OptionCard = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.containers.secondary};

  svg {
    color: ${({ theme }) => theme.text.accent};
  }

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text.primary};
    margin: 0;
  }
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeLimitOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 2rem;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.containers.secondary};
`;

const OptionButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  border: none;
  background-color: ${({ theme, $active, $disabled }) =>
    $disabled
      ? theme.containers.tertiary
      : $active
      ? theme.text.accent
      : theme.containers.secondary};
  color: ${({ theme, $active, $disabled }) =>
    $disabled
      ? theme.text.secondary
      : $active
      ? theme.background.primary
      : theme.text.primary};

  &:hover {
    background-color: ${({ theme, $active, $disabled }) =>
      $disabled
        ? theme.containers.tertiary
        : $active
        ? theme.text.accentHover
        : theme.containers.tertiary};
  }
`;

const TimeButton = styled(OptionButton)`
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme, $active }) =>
    $active ? theme.text.accent : theme.containers.tertiary};
  color: ${({ theme, $active }) =>
    $active ? theme.background.primary : theme.text.primary};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.text.accentHover : theme.containers.secondary};
  }
`;

const ComingSoonTag = styled.span`
  position: absolute;
  right: 1rem;
  background-color: ${({ theme }) => theme.text.accent};
  color: ${({ theme }) => theme.background.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.containers.secondary};
  color: ${({ theme }) => theme.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.containers.tertiary};
  }
`;

const StartButton = styled(Button)`
  background-color: ${({ theme }) => theme.text.accent};
  color: ${({ theme }) => theme.background.primary};

  &:hover {
    background-color: ${({ theme }) => theme.text.accentHover};
  }
`;

export default GameOptions;
