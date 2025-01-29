import { create } from "zustand";
import { useGravityStore } from "./gravityStore";
import { useBoardStore } from "./boardStore";
import { BOARD_WIDTH, HIDDEN_ROWS } from "../services/utils/board";

interface GameStore {
  score: number;
  level: number;
  linesCleared: number;
  totalLinesCleared: number;
  timeRemaining: number;
  timerInterval: NodeJS.Timeout | null;
  isGameOver: boolean;
  gameOverReason: "blockout" | "timeout" | "lockout" | null;
  setTimeRemaining: (time: number) => void;
  resetState: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  updateScore: (clearedLines: number) => void;
  checkGameOver: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  level: 1,
  linesCleared: 0,
  totalLinesCleared: 0,
  timeRemaining: 90,
  timerInterval: null,
  isGameOver: false,
  gameOverReason: null,
  setTimeRemaining: (time: number) => set({ timeRemaining: time }),

  resetState: () => {
    set({
      score: 0,
      level: 1,
      linesCleared: 0,
      totalLinesCleared: 0,
      timeRemaining: 90,
      isGameOver: false,
      gameOverReason: null,
    });
  },

  startTimer: () => {
    const currentTimer = get().timerInterval;
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    const timer = setInterval(() => {
      set((state) => {
        if (state.timeRemaining <= 0) {
          clearInterval(timer);
          get().checkGameOver();
          return { timeRemaining: 0 };
        }
        return { timeRemaining: state.timeRemaining - 1 };
      });
    }, 1000);

    set({ timerInterval: timer });
  },

  stopTimer: () => {
    const currentTimer = get().timerInterval;
    if (currentTimer) {
      clearInterval(currentTimer);
    }
    set({ timerInterval: null });
  },

  updateScore: (clearedLines) => {
    if (clearedLines === 0) return;

    const basePoints = 100;
    const multipliers = [1, 2.5, 7.5, 15]; // Multipliers for 1, 2, 3, or 4 lines
    const scoreIncrease = Math.floor(
      basePoints * (multipliers[clearedLines - 1] || 0)
    );

    set((state) => {
      const newTotalLines = state.totalLinesCleared + clearedLines;
      const newLevel = Math.floor(newTotalLines / 10) + 1;

      // Update gravity speed based on level
      if (newLevel !== state.level) {
        const newSpeed = Math.max(100, 800 - (newLevel - 1) * 50);
        useGravityStore.getState().setGravitySpeed(newSpeed);
      }

      return {
        score: state.score + scoreIncrease,
        linesCleared: clearedLines,
        totalLinesCleared: newTotalLines,
        level: newLevel,
      };
    });
  },

  checkGameOver: () => {
    const boardStore = useBoardStore.getState();
    let canPlacePiece = false;

    // Try all positions in hidden rows
    for (let y = 1; y >= -HIDDEN_ROWS; y--) {
      const testPosition = {
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y,
      };

      if (boardStore.isValidMove(testPosition)) {
        canPlacePiece = true;
        break;
      }
    }

    if (!canPlacePiece) {
      set({
        isGameOver: true,
        gameOverReason: "blockout",
      });
      get().stopTimer();
      return true;
    }

    if (get().timeRemaining <= 0) {
      set({
        isGameOver: true,
        gameOverReason: "timeout",
      });
      get().stopTimer();
      return true;
    }

    return false;
  },
}));
