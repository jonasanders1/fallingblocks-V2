import { useGravityStore } from "../stores/gravityStore";
import { usePieceStore } from "../stores/pieceStore";
import { useGameStore } from "../stores/gameStore";
import { useCallback } from "react";
import { useBoardStore } from "./boardStore";

export const useGameCoordinator = () => {
  const gravity = useGravityStore();
  const piece = usePieceStore();
  const board = useBoardStore();
  const gameState = useGameStore();

  const initGame = useCallback(() => {
    // Reset all stores to initial state
    gameState.resetState();

    // Initialize game pieces
    piece.refillQueue();
    piece.generateNewPiece();

    // Start game mechanics
    gravity.startGravity();
    gameState.startTimer();
  }, []);

  const endGame = useCallback(() => {
    gravity.stopGravity();
    gameState.stopTimer();
  }, []);

  return {
    initGame,
    endGame,
  };
};
