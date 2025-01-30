import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";

import styled from "styled-components";
import SidePanel from "./SidePanel/SidePanel";
import { usePieceStore } from "@/stores/pieceStore";
import { useGameStore } from "@/stores/gameStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMenuStore } from "@/stores/menuStore";
import Modal from "../Shared/Modal/Modal";
import { useGravityStore } from "@/stores/gravityStore";

import Button from "../Shared/Button/Button";
import { useGameCoordinator } from "@/stores/useGameCoordinator";

interface GameContainerProps {
  $isOpponent: boolean;
}

const GameContainer = ({ $isOpponent }: GameContainerProps) => {
  const { holdPiece } = usePieceStore();
  const pieceQueue = usePieceStore((state) => state.pieceQueue);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const navigate = useNavigate();
  const { initGame } = useGameCoordinator();
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  const { stopTimer, startTimer } = useGameStore();
  const { stopGravity, startGravity } = useGravityStore();

  useEffect(() => {
    if (isGameOver) {
      navigate("/game-over");
    }
  }, [isGameOver, navigate]);

  useEffect(() => {
    if (isMenuOpen) {
      stopGravity();
      stopTimer();
    } else {
      startGravity();
      startTimer();
    }
  }, [isMenuOpen]);

  // Add ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(!isMenuOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleResetGame = () => {
    initGame();
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <Modal
          isOpen={isMenuOpen}
          title="Game Paused"
          onClose={() => setIsMenuOpen(false)}
        >
          <ButtonContainer>
            <Button
              onClick={() => setIsMenuOpen(false)}
              text="Resume"
              $active={true}
            />
            <Button
              onClick={() => handleResetGame()}
              text="Restart"
              $active={true}
            />
            <Button
              onClick={() => {
                // Add quit logic
              }}
              text="Quit"
            />
          </ButtonContainer>
        </Modal>
      )}

      <StyledGameContainer $isOpponent={$isOpponent}>
        <GameHeader $isOpponent={$isOpponent} />
        <StyledGameboardContainer>
          <SidePanel
            $side="left"
            content={[{ left: { title: "Hold", piece: `${holdPiece}` } }]}
          />
          <Gameboard />
          <SidePanel
            $side="right"
            content={[
              { right: { nextPieces: { title: "Next", pieces: pieceQueue } } },
            ]}
          />
        </StyledGameboardContainer>
      </StyledGameContainer>
    </>
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  button {
    width: 100%;
  }
`;

export default GameContainer;
