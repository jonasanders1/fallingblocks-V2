import { useGravityStore } from "../stores/gravityStore";
// import { useBoardStore } from "../stores/boardStore";
import { usePieceStore } from "../stores/pieceStore";
import { useGameStore } from "../stores/gameStore";

export const useGameCoordinator = () => {
  const gravity = useGravityStore();
  // const board = useBoardStore();
  const piece = usePieceStore();
  const gameState = useGameStore();

  const initGame = () => {
    piece.refillQueue();
    piece.generateNewPiece();
    gravity.startGravity();
    gameState.startTimer();
  };

  const endGame = () => {
    gravity.stopGravity();
    gameState.stopTimer();
  };

  return {
    initGame,
    endGame,
  };
};
