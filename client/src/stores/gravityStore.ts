import { create } from "zustand";
import { usePieceStore } from "./pieceStore";
import { useBoardStore } from "./boardStore";

interface GravityStore {
  gravitySpeed: number;
  isPlaying: boolean;
  gravityTimer: NodeJS.Timeout | null;
  startGravity: () => void;
  stopGravity: () => void;
  setGravitySpeed: (speed: number) => void;
}

export const useGravityStore = create<GravityStore>((set, get) => ({
  gravitySpeed: 800,
  isPlaying: false,
  gravityTimer: null,

  setGravitySpeed: (speed) => set({ gravitySpeed: speed }),

  startGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    const timer = setInterval(() => {
      if (!get().isPlaying) return;

      const pieceStore = usePieceStore.getState();
      const boardStore = useBoardStore.getState();
      const currentPiece = pieceStore.currentPiece;

      const newPosition = {
        x: currentPiece.position.x,
        y: currentPiece.position.y + 1,
      };

      if (boardStore.isValidMove(newPosition)) {
        pieceStore.movePiece({ x: 0, y: 1 });
      } else {
        boardStore.lockPiece();
      }
    }, get().gravitySpeed);

    set({ isPlaying: true, gravityTimer: timer });
  },

  stopGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }
    set({ isPlaying: false, gravityTimer: null });
  },
}));
