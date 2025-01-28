import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";

import styled from "styled-components";
import SidePanel from "./SidePanel/SidePanel";
import { usePieceStore } from "@/stores/pieceStore";

interface GameContainerProps {
  $isPlayer: boolean;
}

const GameContainer = ({ $isPlayer }: GameContainerProps) => {
  const { holdPiece } = usePieceStore();
  const pieceQueue = usePieceStore((state) => state.pieceQueue);

  return (
    <StyledGameContainer $isPlayer={$isPlayer}>
      <GameHeader $isPlayer={$isPlayer} />
      <StyledGameboardContainer>
        <SidePanel
          $side="left"
          content={[
            {
              left: {
                title: "Hold",
                piece: `${holdPiece}`,
              },
            },
          ]}
        />
        <Gameboard />
        <SidePanel
          $side="right"
          content={[
            {
              right: {
                nextPieces: {
                  title: "Next",
                  pieces: pieceQueue,
                },
              },
            },
          ]}
        />
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

export default GameContainer;
