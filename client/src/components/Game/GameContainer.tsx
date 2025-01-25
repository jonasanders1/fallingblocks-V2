import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";
import PieceOnHold from "./PieceOnHold/PieceOnHold";
import GameStats from "./GameStats/GameStats";
import NextPieces from "./NextPieces/NextPieces";
import { StyledSidePanel } from "@/components/Shared/shared.styles";
import styled from "styled-components";
const GameContainer = () => {
  return (
    <StyledGameContainer>
      <GameHeader />

      <StyledGameboardContainer>
        <StyledSidePanel side="left">
          <PieceOnHold /> 
          <GameStats />
        </StyledSidePanel>

        <Gameboard />

        <StyledSidePanel side="right">
          <NextPieces />
        </StyledSidePanel>
      </StyledGameboardContainer>
    </StyledGameContainer>
  );
};

const StyledGameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
`;

const StyledGameboardContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  width: fit-content;
  gap: 0.5rem;
`;

export default GameContainer;
