import {
  GameSideBox,
  StyledSegment,
  StyledSegmentTitle,
} from "@/components/Shared/shared.styles";
import { useGameStore } from "@/stores/gameStore";
import styled from "styled-components";

const GameStats = () => {
  const score = useGameStore((state) => state.score);
  const linesCleared = useGameStore((state) => state.linesCleared);
  const level = useGameStore((state) => state.level);

  return (
    <StyledGameStatsContainer>
      <StyledSegment>
        <StyledSegmentTitle>Score</StyledSegmentTitle>
        <GameSideBox>{score}</GameSideBox>
      </StyledSegment>
      <StyledSegment>
        <StyledSegmentTitle>Lines</StyledSegmentTitle>
        <GameSideBox>{linesCleared}</GameSideBox>
      </StyledSegment>
      <StyledSegment>
        <StyledSegmentTitle>Level</StyledSegmentTitle>
        <GameSideBox>{level}</GameSideBox>
      </StyledSegment>
    </StyledGameStatsContainer>
  );
};

const StyledGameStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export default GameStats;
