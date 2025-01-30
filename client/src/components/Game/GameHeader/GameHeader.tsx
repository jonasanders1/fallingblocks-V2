import placeholder from "@/assets/images/placeholder.png";
import styled, { useTheme } from "styled-components";
import { useGameStore } from "@/stores/gameStore";
import { useModeStore } from "@/stores/modeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

const GameHeader = ({ $isOpponent }: { $isOpponent: boolean }) => {
  const { timeRemaining } = useGameStore();
  const { gameType, timeLimit } = useModeStore();
  const theme = useTheme();

  const getTimeProgress = () => {
    if (gameType === "endless") return 100;
    if (timeRemaining === Infinity) return 100;
    return Math.max(0, Math.min(100, (timeRemaining / timeLimit) * 100));
  };

  const formatTime = () => {
    if (gameType === "endless" || timeRemaining === Infinity) return null;
    return `${Math.max(0, Math.ceil(timeRemaining))} s`;
  };

  return (
    <StyledGameHeader $isOpponent={$isOpponent}>
      <div style={{ padding: "0.5rem", display: "flex", gap: "1rem" }}>
        <StyledImageContainer>
          <img src={placeholder} alt="profile image placeholder" width={50} />
        </StyledImageContainer>

        <StyledTextContainer $isOpponent={$isOpponent}>
          <StyledPlayerName>Player Name</StyledPlayerName>
          <StyledPlayerRating>Rating: 1000</StyledPlayerRating>
        </StyledTextContainer>
      </div>

      <StyledTimeContainer $timeProgress={getTimeProgress()}>
        {gameType === "endless" || timeRemaining === Infinity ? (
          <h4>
            <FontAwesomeIcon
              icon={faInfinity}
              size="lg"
              color={theme.text.primary}
            />
          </h4>
        ) : (
          <h4>{formatTime()}</h4>
        )}
      </StyledTimeContainer>
    </StyledGameHeader>
  );
};

const StyledGameHeader = styled.div<{ $isOpponent: boolean }>`
  display: flex;
  flex-direction: ${({ $isOpponent }) => ($isOpponent ? "row-reverse" : "row")};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.secondary};
  gap: 1rem;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const StyledImageContainer = styled.div`
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 0.3rem;
  overflow: hidden;
`;

const StyledTextContainer = styled.div<{ $isOpponent: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: ${({ $isOpponent }) => ($isOpponent ? "right" : "left")};
  flex-grow: 1;
  gap: 0.1rem;
`;

const StyledPlayerName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
`;

const StyledPlayerRating = styled.h4`
  font-size: 0.9rem;
  font-weight: 400;
`;

const StyledTimeContainer = styled.div<{ $timeProgress: number }>`
  background-color: ${({ theme }) => theme.containers.secondary};
  border-radius: 0.5rem 0 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;
  flex: 1;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  overflow: hidden;
  max-width: 100px;
  position: relative;

  &:before {
    transition: width 0.2s ease;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $timeProgress }) => $timeProgress}%;
    height: 100%;
    background-color: ${({ $timeProgress }) =>
      `hsl(${($timeProgress * 1.2).toFixed(0)}, 70%, 45%)`};
    opacity: 0.3;
  }
  & h4 {
    z-index: 1;
  }
`;

export default GameHeader;
