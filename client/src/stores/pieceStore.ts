import { create } from "zustand";
import { TetrominoType } from "../services/utils/tetrominoes";
import { SPAWN_POSITION } from "../services/utils/board";

interface PieceState {
  currentPiece: {
    type: TetrominoType;
    position: { x: number; y: number };
    rotation: number;
  };
  pieceQueue: TetrominoType[];
  holdPiece: TetrominoType | null;
  canHold: boolean;
  generateNewPiece: () => void;
  movePiece: (movement: { x: number; y: number }) => void;
  rotatePiece: () => void;
  holdCurrentPiece: () => void;
  refillQueue: () => void;
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

  refillQueue: () => {
    const shuffledPieces = [...PIECE_TYPES].sort(() => Math.random() - 0.5);
    set({ pieceQueue: shuffledPieces });
  },

  generateNewPiece: () =>
    set((state) => {
      if (state.pieceQueue.length === 0) {
        state.pieceQueue = [...PIECE_TYPES].sort(() => Math.random() - 0.5);
      }

      const [nextPiece, ...remainingPieces] = state.pieceQueue;
      return {
        currentPiece: {
          type: nextPiece,
          position: { ...SPAWN_POSITION },
          rotation: 0,
        },
        pieceQueue: remainingPieces,
        canHold: true,
      };
    }),

  movePiece: (movement) =>
    set((state) => ({
      currentPiece: {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x + movement.x,
          y: state.currentPiece.position.y + movement.y,
        },
      },
    })),

  rotatePiece: () =>
    set((state) => ({
      currentPiece: {
        ...state.currentPiece,
        rotation: (state.currentPiece.rotation + 1) % 4,
      },
    })),

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

      console.log("Holding piece:", currentType);

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
