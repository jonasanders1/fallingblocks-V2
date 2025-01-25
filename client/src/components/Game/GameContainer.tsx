import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";
import PieceOnHold from "./PieceOnHold/PieceOnHold";
import GameStats from "./GameStats/GameStats";
import NextPieces from "./NextPieces/NextPieces";
import styled from "styled-components";

interface GameContainerProps {
  $isPlayer: boolean;
}

const GameContainer = ({ $isPlayer }: GameContainerProps) => {
  return (
    <StyledGameContainer $isPlayer={$isPlayer}>
      <GameHeader $isPlayer={$isPlayer} />
      <StyledGameboardContainer>
        <StyledSidePanel $side="left">
          <PieceOnHold />
          <GameStats />
        </StyledSidePanel>

        <Gameboard />

        <StyledSidePanel $side="right">
          <NextPieces />
        </StyledSidePanel>
      </StyledGameboardContainer>
    </StyledGameContainer>
  );
};

const StyledGameContainer = styled.div<{ $isPlayer: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
`;

const StyledGameboardContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  width: fit-content;
  gap: 0.5rem;
`;

const StyledSidePanel = styled.div<{ $side: "left" | "right" }>`
  display: flex;
  background-color: ${({ theme }) => theme.containers.primary};
  align-items: center;
  height: fit-content;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  ${({ $side }) =>
    $side === "left" && `border-radius: 0.5rem 0.2rem 0.2rem 0.5rem;`}
  ${({ $side }) =>
    $side === "right" && `border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;`}
`;

export default GameContainer;
