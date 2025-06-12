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
  elapsedTime: number;
  timerInterval: NodeJS.Timeout | null;
  isGameOver: boolean;
  gameOverReason: "blockout" | "timeout" | "lockout" | null;
  comboCount: number;
  lastLineClear: number;
  setTimeRemaining: (time: number) => void;
  resetState: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  updateScore: (clearedLines: number, isHardDrop?: boolean, dropDistance?: number) => void;
  checkGameOver: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  level: 1,
  linesCleared: 0,
  totalLinesCleared: 0,
  timeRemaining: useModeStore.getState().timeLimit,
  elapsedTime: 0,
  timerInterval: null,
  isGameOver: false,
  gameOverReason: null,
  comboCount: 0,
  lastLineClear: 0,
  setTimeRemaining: (time: number) => set({ timeRemaining: time }),

  resetState: () => {
    const timeLimit = useModeStore.getState().timeLimit;
    set({
      score: 0,
      level: 1,
      linesCleared: 0,
      totalLinesCleared: 0,
      timeRemaining: timeLimit,
      elapsedTime: 0,
      isGameOver: false,
      gameOverReason: null,
      comboCount: 0,
      lastLineClear: 0,
    });
  },

  startTimer: () => {
    const currentTimer = get().timerInterval;
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    const timer = setInterval(() => {
      set((state) => {
        if (state.isGameOver) {
          clearInterval(timer);
          return state;
        }

        const newElapsedTime = state.elapsedTime + 1;
        let newTimeRemaining = state.timeRemaining;

        if (
          state.timeRemaining !== Infinity &&
          useModeStore.getState().gameType === "timed"
        ) {
          newTimeRemaining = Math.max(0, state.timeRemaining - 1);
          if (newTimeRemaining <= 0) {
            clearInterval(timer);
            get().checkGameOver();
          }
        }

        return { 
          timeRemaining: newTimeRemaining,
          elapsedTime: newElapsedTime
        };
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

  updateScore: (clearedLines: number, isHardDrop = false, dropDistance = 0) => {
    // Reset combo if no lines are cleared
    if (clearedLines === 0) {
      set({ comboCount: 0, lastLineClear: 0 });
      return;
    }

    // Base points for line clears
    const basePoints = {
      1: 100,  // Single
      2: 300,  // Double
      3: 500,  // Triple
      4: 800,  // Tetris
    }[clearedLines] || 0;

    // Combo bonus
    const currentCombo = get().comboCount;
    const comboMultiplier = Math.max(1, currentCombo * 0.5); // 1x, 1.5x, 2x, 2.5x, etc.

    // Drop bonus
    const dropBonus = isHardDrop ? dropDistance * 2 : dropDistance;

    set((state) => {
      const newTotalLines = state.totalLinesCleared + clearedLines;
      const newLevel = Math.floor(newTotalLines / 10) + 1;
      const levelMultiplier = newLevel;

      // Calculate total score
      const lineClearScore = basePoints * levelMultiplier * comboMultiplier;
      const totalScore = state.score + lineClearScore + dropBonus;

      // Update gravity speed based on level
      if (newLevel !== state.level) {
        const newSpeed = Math.max(100, 800 - (newLevel - 1) * 50);
        useGravityStore.getState().setGravitySpeed(newSpeed);
      }

      return {
        score: totalScore,
        linesCleared: clearedLines,
        totalLinesCleared: newTotalLines,
        level: newLevel,
        comboCount: currentCombo + 1,
        lastLineClear: clearedLines,
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
