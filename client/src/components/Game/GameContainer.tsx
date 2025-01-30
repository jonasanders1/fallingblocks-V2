import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";

import styled from "styled-components";
import SidePanel from "./SidePanel/SidePanel";
import { usePieceStore } from "@/stores/pieceStore";
import { useGameStore } from "@/stores/gameStore";
import GameOver from "./GameOver/GameOver";

interface GameContainerProps {
  $isOpponent: boolean;
}

const GameContainer = ({ $isOpponent }: GameContainerProps) => {
  const { holdPiece } = usePieceStore();
  const pieceQueue = usePieceStore((state) => state.pieceQueue);
  const isGameOver = useGameStore((state) => state.isGameOver);

  return (
    <StyledGameContainer $isOpponent={$isOpponent}>
      {isGameOver && <GameOver />}
      <>
        <GameHeader $isOpponent={$isOpponent} />
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
      </>
    </StyledGameContainer>
  );
};

const StyledGameContainer = styled.div<{ $isOpponent: boolean }>`
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
