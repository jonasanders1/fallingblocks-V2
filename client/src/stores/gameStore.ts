import { create } from "zustand";
import { useGravityStore } from "./gravityStore";
import { useBoardStore } from "./boardStore";
import { useModeStore } from "./modeStore";

import { BOARD_WIDTH } from "../services/utils/board";

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
  timeRemaining: useModeStore.getState().timeLimit,
  timerInterval: null,
  isGameOver: false,
  gameOverReason: null,
  setTimeRemaining: (time: number) => set({ timeRemaining: time }),

  resetState: () => {
    const timeLimit = useModeStore.getState().timeLimit;
    set({
      score: 0,
      level: 1,
      linesCleared: 0,
      totalLinesCleared: 0,
      timeRemaining: timeLimit,
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
        if (
          state.timeRemaining === Infinity ||
          useModeStore.getState().gameType === "endless"
        ) {
          return state;
        }

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
    const gravityStore = useGravityStore.getState();

    // Only check original spawn position
    const originalPosition = {
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 2,
    };

    if (!boardStore.isValidMove(originalPosition)) {
      set({
        isGameOver: true,
        gameOverReason: "blockout",
      });
      get().stopTimer();
      gravityStore.stopGravity();
      return true;
    }

    if (get().timeRemaining <= 0) {
      set({
        isGameOver: true,
        gameOverReason: "timeout",
      });
      get().stopTimer();
      gravityStore.stopGravity();
      return true;
    }

    return false;
  },
}));
