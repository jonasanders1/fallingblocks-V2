import { create } from "zustand";
import { TetrominoType } from "../services/utils/tetrominoes";
import { SPAWN_POSITION } from "../services/utils/board";
import { useBoardStore } from "./boardStore";
import { useGravityStore } from "./gravityStore";

interface PieceState {
  currentPiece: {
    type: TetrominoType;
    position: { x: number; y: number };
    rotation: number;
  };
  pieceQueue: TetrominoType[];
  holdPiece: TetrominoType | null;
  canHold: boolean;
  lastDropDistance: number;
  isHardDrop: boolean;
  generateNewPiece: () => void;
  movePiece: (movement: { x: number; y: number }, isHardDrop?: boolean) => void;
  rotatePiece: () => void;
  holdCurrentPiece: () => void;
  refillQueue: () => void;
  resetDropState: () => void;
}

const PIECE_TYPES: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

export const usePieceStore = create<PieceState>((set) => ({
  currentPiece: {
    type: "I",
    position: { ...SPAWN_POSITION },
    rotation: 0,
  },
  pieceQueue: [],
  holdPiece: null,
  canHold: true,
  lastDropDistance: 0,
  isHardDrop: false,

  resetDropState: () => set({ lastDropDistance: 0, isHardDrop: false }),

  refillQueue: () => {
    const shuffledPieces = [...PIECE_TYPES].sort(() => Math.random() - 0.5);
    set({ pieceQueue: shuffledPieces.slice(0, 4) });
  },

  generateNewPiece: () =>
    set((state) => {
      const [nextPiece, ...remainingPieces] = state.pieceQueue;
      const randomPiece = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
      const newQueue = [...remainingPieces, randomPiece];

      // Try original spawn position first
      const originalPosition = { ...SPAWN_POSITION, y: 2 };
      
      // If original position is valid, use it
      if (useBoardStore.getState().isValidMove({ ...originalPosition, y: 2 })) {
        return {
          currentPiece: {
            type: nextPiece,
            position: originalPosition,
            rotation: 0,
          },
          pieceQueue: newQueue,
          canHold: true,
        };
      }

      // If original position is blocked, use higher position
      return {
        currentPiece: {
          type: nextPiece,
          position: { ...SPAWN_POSITION }, // Uses y: -1 from SPAWN_POSITION
          rotation: 0,
        },
        pieceQueue: newQueue,
        canHold: true,
      };
    }),

  movePiece: (movement, isHardDrop = false) =>
    set((state) => {
      const newPosition = {
        x: state.currentPiece.position.x + movement.x,
        y: state.currentPiece.position.y + movement.y,
      };

      // Only move if valid and reset lock delay
      if (useBoardStore.getState().isValidMove(newPosition)) {
        // Reset lock delay if moving horizontally or down
        if (movement.x !== 0 || movement.y > 0) {
          useGravityStore.getState().resetLockDelay();
        }

        // Track drop distance for scoring
        const dropDistance = movement.y > 0 ? movement.y : 0;

        return {
          currentPiece: {
            ...state.currentPiece,
            position: newPosition,
          },
          lastDropDistance: dropDistance,
          isHardDrop: isHardDrop,
        };
      }
      return state;
    }),

  rotatePiece: () =>
    set((state) => {
      const newRotation = (state.currentPiece.rotation + 1) % 4;
      
      // Only rotate if valid and reset lock delay
      if (useBoardStore.getState().isValidMove(state.currentPiece.position, newRotation)) {
        useGravityStore.getState().resetLockDelay();
        return {
          currentPiece: {
            ...state.currentPiece,
            rotation: newRotation,
          },
        };
      }
      return state;
    }),

  holdCurrentPiece: () =>
    set((state) => {
      if (!state.canHold) return state;

      const currentType = state.currentPiece.type;
      if (state.holdPiece === null) {
        const [next, ...remaining] = state.pieceQueue;
        const randomPiece = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];

        return {
          holdPiece: currentType,
          canHold: false,
          currentPiece: {
            type: next,
            position: { ...SPAWN_POSITION },
            rotation: 0,
          },
          pieceQueue: [...remaining, randomPiece],
        };
      }

      return {
        holdPiece: currentType,
        canHold: false,
        currentPiece: {
          type: state.holdPiece,
          position: { ...SPAWN_POSITION },
          rotation: 0,
        },
      };
    }),
}));
