import styled from "styled-components";
import { useGameStore } from "@/stores/gameStore";
import Button from "@/components/Shared/Button/Button";
import { useNavigate } from "react-router-dom";
import { useGameCoordinator } from "@/stores/useGameCoordinator";

const GameOver = () => {
  const { isGameOver, gameOverReason, score } = useGameStore();
  const navigate = useNavigate();
  const { initGame } = useGameCoordinator();

  if (!isGameOver) return null;

  const getGameOverMessage = () => {
    switch (gameOverReason) {
      case "blockout":
        return "Game Over!";
      case "timeout":
        return "Time's Up!";
      case "lockout":
        return "Game Over!";
      default:
        return "Game Over!";
    }
  };

  const handleRestart = () => {
    initGame();
  };

  const handleExit = () => {
    navigate("/game-options");
  };

  return (
    <StyledOverlay>
      <StyledGameOver>
        <h2>{getGameOverMessage()}</h2>
        <p>Final Score: {score}</p>
        <ButtonContainer>
          <Button onClick={handleRestart} text="Play Again" $active={true} />
          <Button onClick={handleExit} text="Exit" />
        </ButtonContainer>
      </StyledGameOver>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const StyledGameOver = styled.div`
  background: ${({ theme }) => theme.containers.primary};
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export default GameOver;
