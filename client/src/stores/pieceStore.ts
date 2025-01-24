import { create } from "zustand";
import { TetrominoType } from "../services/utils/tetrominoes";
import { SPAWN_POSITION } from "../services/utils/board";
import { useBoardStore } from "./boardStore";

interface PieceStore {
  currentPiece: {
    type: TetrominoType;
    position: { x: number; y: number };
    rotation: number;
  };
  holdPiece: TetrominoType | null;
  pieceQueue: TetrominoType[];
  canHold: boolean;

  movePiece: (direction: { x: number; y: number }) => void;
  rotatePiece: () => void;
  holdCurrentPiece: () => void;
  generateNewPiece: () => void;
  refillQueue: () => void;
}

export const usePieceStore = create<PieceStore>((set) => ({
  currentPiece: {
    type: "T",
    position: { ...SPAWN_POSITION },
    rotation: 0,
  },
  holdPiece: null,
  pieceQueue: [],
  canHold: true,

  movePiece: (direction) =>
    set((state) => {
      const newPosition = {
        x: state.currentPiece.position.x + direction.x,
        y: state.currentPiece.position.y + direction.y,
      };

      if (useBoardStore.getState().isValidMove(newPosition)) {
        return {
          currentPiece: {
            ...state.currentPiece,
            position: newPosition,
          },
        };
      }

      return state;
    }),

  rotatePiece: () =>
    set((state) => {
      const newRotation = (state.currentPiece.rotation + 1) % 4;

      if (
        useBoardStore
          .getState()
          .isValidMove(state.currentPiece.position, newRotation)
      ) {
        return {
          currentPiece: {
            ...state.currentPiece,
            rotation: newRotation,
          },
        };
      }
      return state;
    }),

  generateNewPiece: () =>
    set((state) => {
      const [nextPiece, ...remainingPieces] = state.pieceQueue;
      const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
      const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

      return {
        currentPiece: {
          type: nextPiece,
          position: { ...SPAWN_POSITION },
          rotation: 0,
        },
        pieceQueue: [...remainingPieces, randomPiece],
      };
    }),

  refillQueue: () =>
    set(() => {
      const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
      const initialQueue = Array.from({ length: 4 }, () => {
        const randomIndex = Math.floor(Math.random() * pieces.length);
        return pieces[randomIndex];
      });

      return { pieceQueue: initialQueue };
    }),

  holdCurrentPiece: () =>
    set((state) => {
      if (!state.canHold) return state;

      const currentType = state.currentPiece.type;

      if (state.holdPiece === null) {
        const [next, ...remaining] = state.pieceQueue;
        const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

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
