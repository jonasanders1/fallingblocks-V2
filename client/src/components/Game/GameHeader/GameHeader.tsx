import placeholder from "@/assets/images/placeholder.png";
import styled from "styled-components";
import { useGameStore } from "@/stores/gameStore";
const GameHeader = ({ $isOpponent }: { $isOpponent: boolean }) => {
  const { score } = useGameStore();

  return (
    <StyledGameHeader $isOpponent={$isOpponent}>
      <StyledImageContainer className="image-container">
        <img src={placeholder} alt="profile image placeholder" width={50} />
      </StyledImageContainer>

      <StyledTextContainer $isOpponent={$isOpponent}>
        <StyledPlayerName>Player Name</StyledPlayerName>
        <StyledPlayerRating>Rating: 1000</StyledPlayerRating>
      </StyledTextContainer>

      <StyledScoreContainer $isOpponent={$isOpponent}>
        <h4>Score</h4>
        <StyledScore>{score}</StyledScore>
      </StyledScoreContainer>
    </StyledGameHeader>
  );
};

const StyledGameHeader = styled.div<{ $isOpponent: boolean }>`
  display: flex;
  flex-direction: ${({ $isOpponent }) => ($isOpponent ? "row-reverse" : "row")};
  align-items: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.containers.primary};
  gap: 1rem;

  border-radius: 0.5rem 0.5rem 0 0;
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

const StyledScoreContainer = styled.div<{ $isOpponent: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 100px;
`;

const StyledScore = styled.h4`
  text-align: center;
  background-color: ${({ theme }) => theme.containers.primary};
  border-radius: 0.2rem;
  box-shadow: inset 0px 0px 5px ${({ theme }) => theme.shadows.medium};
  font-size: 1.1rem;
  font-weight: 600;
`;

export default GameHeader;
