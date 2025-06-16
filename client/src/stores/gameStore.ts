import { create } from "zustand";
import { useModeStore } from "./modeStore";
import { BOARD_WIDTH } from "../services/utils/board";
import { ScoreManager } from "@/services/game/ScoreManager";
import { useGravityStore } from "./gravityStore";
import { useBoardStore } from "./boardStore";
import { SoundManager } from "@/services/game/SoundManager";
import { SOUND_ASSETS, SOUND_KEYS } from "@/constants/sounds";
import { calculateGravitySpeed } from "@/services/utils/gravity";
import { useUIStore } from '@/stores/uiStore';

interface GameStore {
  score: number;
  level: number;
  linesCleared: number;
  totalLinesCleared: number;
  timeRemaining: number;
  elapsedTime: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  isGameOver: boolean;
  gameOverReason: "blockout" | "timeout" | "lockout" | null;
  comboCount: number;
  lastLineClear: number;
  setTimeRemaining: (time: number) => void;
  resetState: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  updateScore: (
    clearedLines: number,
    isHardDrop?: boolean,
    dropDistance?: number
  ) => void;
  checkGameOver: () => boolean;
  scoreManager: ScoreManager;
}

const scoreManager = new ScoreManager();

// Initialize SoundManager and preload sounds
const soundManager = SoundManager.getInstance();
soundManager.preloadSounds(SOUND_ASSETS);

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
  scoreManager,
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
          elapsedTime: newElapsedTime,
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
    const state = get();
    let additionalPoints = 0;

    // Calculate line clear score
    if (clearedLines > 0) {
      const lineScore = state.scoreManager.calculateLineScore(
        clearedLines,
        state.level,
        state.comboCount
      );
      additionalPoints += lineScore;

      // Calculate drop score
      if (dropDistance > 0) {
        additionalPoints += state.scoreManager.calculateDropScore(
          dropDistance,
          isHardDrop
        );
      }

      // Calculate new level
      const newLevel = state.scoreManager.calculateLevelProgress(
        state.totalLinesCleared + clearedLines
      );

      // Update state with new combo count and level
      set((state) => ({
        score: state.score + additionalPoints,
        linesCleared: state.linesCleared + clearedLines,
        totalLinesCleared: state.totalLinesCleared + clearedLines,
        level: newLevel,
        comboCount: state.comboCount + 1,
        lastLineClear: clearedLines,
      }));

      // Update gravity speed if level changed
      if (newLevel !== state.level) {
        const newSpeed = calculateGravitySpeed(newLevel);
        useGravityStore.getState().setGravitySpeed(newSpeed);
      }

      // Play combo sound immediately after state update
      if (state.comboCount + 1 >= 2 && clearedLines !== 4) {
        const clampedCombo = Math.min(state.comboCount + 1, 5);
        const comboKey = SOUND_KEYS[`COMBO_${clampedCombo}` as keyof typeof SOUND_KEYS];
        SoundManager.getInstance().play(comboKey);
      }

      if (clearedLines === 4) {
        useUIStore.getState().showPopup('TETRIS!', 'tetris');
        SoundManager.getInstance().play(SOUND_KEYS.TETRIS);
      } else if (state.comboCount >= 1) {
        useUIStore.getState().showPopup(`Combo x${state.comboCount}!`, 'combo');
      }
    } else {
      // No lines cleared - reset combo and update score
      set((state) => ({
        score: state.score + additionalPoints,
        comboCount: 0,
        lastLineClear: 0,
      }));
    }
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
