import { create } from "zustand";
import { usePieceStore } from "./pieceStore";
import { useBoardStore } from "./boardStore";
import { useMenuStore } from "@/stores/menuStore";
import { calculateGravitySpeed } from "@/services/utils/gravity";

interface GravityStore {
  gravitySpeed: number;
  isPlaying: boolean;
  gravityTimer: NodeJS.Timeout | null;
  lockDelayTimer: NodeJS.Timeout | null;
  startGravity: () => void;
  stopGravity: () => void;
  setGravitySpeed: (speed: number) => void;
  resetLockDelay: () => void;
}

const LOCK_DELAY = 500; // 500ms lock delay

export const useGravityStore = create<GravityStore>((set, get) => ({
  gravitySpeed: calculateGravitySpeed(1), // Initial speed at level 1
  isPlaying: false,
  gravityTimer: null,
  lockDelayTimer: null,

  resetLockDelay: () => {
    const currentLockTimer = get().lockDelayTimer;
    if (currentLockTimer) {
      clearTimeout(currentLockTimer);
      set({ lockDelayTimer: null });
    }
  },

  setGravitySpeed: (speed) => {
    set({ gravitySpeed: speed });
    // Restart gravity with new speed if already playing
    if (get().isPlaying) {
      get().startGravity();
    }
  },

  startGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    const timer = setInterval(() => {
      const { isMenuOpen } = useMenuStore.getState();
      if (!get().isPlaying || isMenuOpen) return;

      const pieceStore = usePieceStore.getState();
      const boardStore = useBoardStore.getState();
      const currentPiece = pieceStore.currentPiece;

      const newPosition = {
        x: currentPiece.position.x,
        y: currentPiece.position.y + 1,
      };

      if (boardStore.isValidMove(newPosition)) {
        // Reset lock delay when piece can move down
        get().resetLockDelay();
        pieceStore.movePiece({ x: 0, y: 1 });
      } else if (!get().lockDelayTimer) {
        // Start lock delay only if not already started
        const lockTimer = setTimeout(() => {
          boardStore.lockPiece();
          set({ lockDelayTimer: null });
        }, LOCK_DELAY);
        set({ lockDelayTimer: lockTimer });
      }
    }, get().gravitySpeed);

    set({ isPlaying: true, gravityTimer: timer });
  },

  stopGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }
    get().resetLockDelay();
    set({ isPlaying: false, gravityTimer: null });
  },
}));
