import { create } from "zustand";

export type GameMode = "singleplayer" | "multiplayer" | "battle-royale";

interface ModeStore {
  currentMode: GameMode;
  setMode: (mode: GameMode) => void;
  isMultiplayerMode: () => boolean;
}

export const useModeStore = create<ModeStore>((set, get) => ({
  currentMode: "singleplayer",

  setMode: (mode) => {
    set({ currentMode: mode });
  },

  isMultiplayerMode: () => {
    return ["multiplayer", "battle-royale"].includes(get().currentMode);
  },
}));
